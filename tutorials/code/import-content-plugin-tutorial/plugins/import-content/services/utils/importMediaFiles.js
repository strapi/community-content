const _ = require("lodash");
const request = require("request");
const fileFromBuffer = require("./fileFromBuffer");
const {getMediaUrlsFromFieldData} = require("../utils/fieldUtils");

const fetchFiles = url =>
  new Promise((resolve, reject) => {
    request({url, method: "GET", encoding: null}, async (err, res, body) => {
      if (err) {
        reject(err);
      }
      const mimeType = res.headers["content-type"].split(";").shift();
      const parsed = new URL(url);
      const extension = parsed.pathname
        .split(".")
        .pop()
        .toLowerCase();
      resolve(fileFromBuffer(mimeType, extension, body));
    });
  });
const storeFiles = async file => {
  const uploadProviderConfig = await strapi
    .store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "upload"
    })
    .get({key: "provider"});
  return await strapi.plugins["upload"].services['upload'].upload(
    [file],
    uploadProviderConfig
  );
};
const relateFileToContent =  ({
                                     contentType,
                                     contentId,
                                     targetField,
                                     fileBuffer
                                   }) => {
  try{
    fileBuffer.related = [
      {
        refId: contentId,
        ref: contentType,
        source: "content-manager",
        field: targetField
      }
    ];
  }
  catch (e) {
    console.log(e)
  }
  return fileBuffer;
};
const importMediaFiles = async (savedContent, sourceItem, importConfig) => {
  const {fieldMapping, contentType} = importConfig;
  const uploadedFileDescriptors = _.mapValues(
    fieldMapping,
    async (mapping, sourceField) => {
      if (mapping.importMediaToField) {
        const urls = getMediaUrlsFromFieldData(sourceItem[sourceField]);
        const fetchPromises = _.uniq(urls).map(fetchFiles);
        const fileBuffers = await Promise.all(fetchPromises);
        const relatedContents = fileBuffers.map(fileBuffer =>
          relateFileToContent({
            contentType,
            contentId: savedContent.id,
            targetField: mapping.importMediaToField,
            fileBuffer
          })
        );
        const storePromises = relatedContents.map(storeFiles);
        const storedFiles = await Promise.all(storePromises);
        console.log(_.flatten(storedFiles));
        return storedFiles;
      }
    }
  );
  return await Promise.all(_.values(uploadedFileDescriptors));
};
module.exports = importMediaFiles;