const getUrls = require("get-urls");
const { urlIsMedia, stringIsEmail } = require("./utils");
const striptags = require("striptags");
const detectStringFieldFormat = data => {
  if (new Date(data).toString() !== "Invalid Date") return "date";
  if (stringIsEmail(data)) return "email";
  if (data.length !== striptags(data).length) {
    return "xml";
  }
  return "string";
};
const detectFieldFormat = data => {
  switch (typeof data) {
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    case "string":
      return detectStringFieldFormat(data);
  }
};

const compileStatsForFieldData = fieldData => {
  const stats = {};
  switch (typeof fieldData) {
    case "string":
      try {
        const urls = Array.from(getUrls(fieldData));
        const l = urls.length;
        for (let i = 0; i < l; ++i) {
          if (urlIsMedia(urls[i])) {
            stats.hasMediaUrls = true;
            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
      stats.length = fieldData.length;
      break;
    case "object":
      if (urlIsMedia(fieldData.url)) {
        stats.hasMediaUrls = true;
      }
      stats.length = JSON.stringify(fieldData).length;
      break;
    default:
      console.log(typeof fieldData, fieldData);
  }
  stats.format = detectFieldFormat(fieldData);
  return stats;
};

const getMediaUrlsFromFieldData = fieldData => {
  switch (typeof fieldData) {
    case "string":
      return Array.from(getUrls(fieldData)).filter(urlIsMedia);
    case "object":
      return urlIsMedia(fieldData.url) ? [fieldData.url] : [];
  }
};

module.exports = {
  detectStringFieldFormat,
  detectFieldFormat,
  compileStatsForFieldData,
  getMediaUrlsFromFieldData
};