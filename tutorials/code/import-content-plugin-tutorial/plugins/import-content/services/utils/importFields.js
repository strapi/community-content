const striptags = require("striptags");
const importFields = async (sourceItem, fieldMapping) => {
  const importedItem = {};
  Object.keys(fieldMapping).forEach(async sourceField => {
    const { targetField, stripTags } = fieldMapping[sourceField];
    if (!targetField || targetField === "none") {
      return;
    }
    const originalValue = sourceItem[sourceField];
    importedItem[targetField] = stripTags
      ? striptags(originalValue)
      : originalValue;
  });
  return importedItem;
};
module.exports = importFields;