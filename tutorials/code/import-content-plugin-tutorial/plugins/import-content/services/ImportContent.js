"use strict";
/** * ImportContent.js service
 * * @description: A set of functions similar to controller's actions to avoid code duplication. */
const {resolveDataFromRequest, getItemsFromData} = require("./utils/utils");
const analyzer = require("./utils/analyzer");
const _ = require("lodash");
const importFields = require("./utils/importFields");
const importMediaFiles = require("./utils/importMediaFiles");

const import_queue = {};
const importNextItem = async importConfig => {
  const sourceItem = import_queue[importConfig.id].shift();
  if (!sourceItem) {
    console.log("import complete");
    await strapi
      .query("importconfig", "import-content")
      .update({id: importConfig.id}, {ongoing: false});
    return;
  }
  try {
    const importedItem = await importFields(
      sourceItem,
      importConfig.fieldMapping
    );
    const savedContent = await strapi
      .query(importConfig.contentType)
      .create(importedItem);
    const uploadedFiles = await importMediaFiles(
      savedContent,
      sourceItem,
      importConfig
    );
    const fileIds = _.map(_.flatten(uploadedFiles), "id");
    await strapi.query("importeditem", "import-content").create({
      importconfig: importConfig.id,
      ContentId: savedContent.id,
      ContentType: importConfig.contentType,
      importedFiles: {fileIds}
    });
  } catch (e) {
    console.log(e);
  }
  setTimeout(() => importNextItem(importConfig), 0);
};

const undo_queue = {};
const removeImportedFiles = async (fileIds, uploadConfig) => {
  const removePromises = fileIds.map(id =>
    strapi.plugins["upload"].services.upload.remove({id}, uploadConfig)
  );
  return await Promise.all(removePromises);
};
const undoNextItem = async (importConfig, uploadConfig) => {
  const item = undo_queue[importConfig.id].shift();
  if (!item) {
    console.log("undo complete");
    await strapi
      .query("importconfig", "import-content")
      .update({id: importConfig.id}, {ongoing: false});
    return;
  }
  try {
    await strapi.query(importConfig.contentType).delete({id: item.ContentId});
  } catch (e) {
    console.log(e);
  }
  try {
    const importedFileIds = _.compact(item.importedFiles.fileIds);
    await removeImportedFiles(importedFileIds, uploadConfig);
  } catch (e) {
    console.log(e);
  }
  try {
    await strapi.query("importeditem", "import-content").delete({
      id: item.id
    });
  } catch (e) {
    console.log(e);
  }
  setTimeout(() => undoNextItem(importConfig, uploadConfig), 0);
};
module.exports = {
  preAnalyzeImportFile: async ctx => {
    const {dataType, body, options} = await resolveDataFromRequest(ctx);
    const {sourceType, items} = await getItemsFromData({
      dataType,
      body,
      options
    });
    const analysis = analyzer.analyze(sourceType, items);
    return {sourceType, ...analysis};
  },
  importItems: (importConfig, ctx) =>
    new Promise(async (resolve, reject) => {
      const {dataType, body} = await resolveDataFromRequest(ctx);
      console.log("importitems", importConfig);
      try {
        const {items} = await getItemsFromData({
          dataType,
          body,
          options: importConfig.options
        });
        import_queue[importConfig.id] = items;
      } catch (error) {
        reject(error);
      }
      resolve({
        status: "import started",
        importConfigId: importConfig.id
      });
      importNextItem(importConfig);
    }),
  undoItems: importConfig =>
    new Promise(async (resolve, reject) => {
      try {
        undo_queue[importConfig.id] = importConfig.importeditems;
      } catch (error) {
        reject(error);
      }
      await strapi
        .query("importconfig", "import-content")
        .update({id: importConfig.id}, {ongoing: true});
      resolve({
        status: "undo started",
        importConfigId: importConfig.id
      });
      const uploadConfig = await strapi
        .store({
          environment: strapi.config.environment,
          type: "plugin",
          name: "upload"
        })
        .get({key: "provider"});
      undoNextItem(importConfig, uploadConfig);
    }),
};
