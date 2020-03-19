"use strict";
const _ = require("lodash");
var ss = require("simple-statistics");
const {compileStatsForFieldData} = require("./fieldUtils");
const getFieldNameSet = items => {
  const fieldNames = new Set();
  items.forEach(item => {
    try {
      Object.keys(item).forEach(fieldName => fieldNames.add(fieldName));
    } catch (e) {
      console.log(e);
    }
  });
  return fieldNames;
};
const analyze = (sourceType, items) => {
  const fieldNames = getFieldNameSet(items);
  const fieldAnalyses = {};
  fieldNames.forEach(fieldName => (fieldAnalyses[fieldName] = []));
  items.forEach(item => {
    fieldNames.forEach(fieldName => {
      const fieldData = item[fieldName];
      const fieldStats = compileStatsForFieldData(fieldData);
      fieldAnalyses[fieldName].push(fieldStats);
    });
  });
  const fieldStats = Object.keys(fieldAnalyses).map(fieldName => {
    const fieldAnalysis = fieldAnalyses[fieldName];
    const fieldStat = {fieldName, count: fieldAnalysis.length};
    try {
      fieldStat.format = _.chain(fieldAnalysis)
        .countBy("format")
        .map((value, key) => ({count: value, type: key}))
        .sortBy("count")
        .reverse()
        .head()
        .get("type")
        .value();
    } catch (e) {
      console.log(e);
    }
    fieldStat.hasMediaUrls = fieldAnalysis.some(fa => Boolean(fa.hasMediaUrls));
    const lengths = _.map(fieldAnalysis, "length");
    fieldStat.minLength = ss.min(lengths);
    fieldStat.maxLength = ss.max(lengths);
    fieldStat.meanLength = ss.mean(lengths).toFixed(2);
    return fieldStat;
  });
  return {itemCount: items.length, fieldStats};
};
module.exports = {getFieldNameSet, analyze};