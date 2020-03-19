"use strict";
const request = require("request");
const contentTypeParser = require("content-type-parser");
const RssParser = require("rss-parser");
const CsvParser = require("csv-parse/lib/sync");
const urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\- ;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
const URL_REGEXP = new RegExp(urlRegEx);
const validateUrl = url => {
  URL_REGEXP.lastIndex = 0;
  return URL_REGEXP.test(url);
};
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const stringIsEmail = data => {
  EMAIL_REGEXP.lastIndex = 0;
  return EMAIL_REGEXP.test(data);
};
const getDataFromUrl = url => {
  return new Promise((resolve, reject) => {
    if (!validateUrl(url)) return reject("invalid URL");
    request(url, null, async (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve({ dataType: res.headers["content-type"], body });
    });
  });
};
const resolveDataFromRequest = async ctx => {
  const { source, type, options, data } = ctx.request.body;
  switch (source) {
    case "upload":
      return { dataType: type, body: data, options };
    case "url":
      const { dataType, body } = await getDataFromUrl(options.url);
      return { dataType, body, options };
    case "raw":
      return {
        dataType: type,
        body: options.rawText,
        options
      };
  }
};
const getItemsFromData = ({ dataType, body, options }) =>
  new Promise(async (resolve, reject) => {
    const parsedContentType = contentTypeParser(dataType);
    if (parsedContentType.isXML()) {
      const parser = new RssParser();
      const feed = await parser.parseString(body);
      return resolve({ sourceType: "rss", items: feed.items });
    }
    if (dataType === "text/csv" || dataType === "application/vnd.ms-excel") {
      const items = CsvParser(body, {
        ...options,
        columns: true
      });
      return resolve({ sourceType: "csv", items });
    }
    reject({
      contentType: parsedContentType.toString()
    });
  });
const urlIsMedia = url => {
  try {
    const parsed = new URL(url);
    const extension = parsed.pathname
      .split(".")
      .pop()
      .toLowerCase();
    switch (extension) {
      case "png":
      case "gif":
      case "jpg":
      case "jpeg":
      case "svg":
      case "bmp":
      case "tif":
      case "tiff":
        return true;
      case "mp3":
      case "wav":
      case "ogg":
        return true;
      case "mp4":
      case "avi":
        return true;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};
module.exports = {
  resolveDataFromRequest,
  getItemsFromData,
  getDataFromUrl,
  stringIsEmail,
  urlIsMedia
};