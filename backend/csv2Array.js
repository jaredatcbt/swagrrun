const simpleCsv2Array = (csvString) => {
  csvString = csvString.replace(/(\r\n|\n|\r)/gm, "");
  csvString = csvString.replace(/['"]+/g, "");
  let convertedArray = csvString.split(",");

  convertedArray = convertedArray.map(s => s.trim());

  return convertedArray;
};

module.exports = simpleCsv2Array;
