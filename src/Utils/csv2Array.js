export const simpleCsv2Array = (csvString) => {
  csvString = csvString.replace(/(\r\n|\n|\r)/gm, "");
  csvString = csvString.replace(/['"]+/g, '');
  let convertedArray = csvString.split(",");

  return convertedArray;
};

export function complexCSV2Array(str, delimiter = ",") {
  str = str.replace(/(\r\n|\r)/gm, "\n");
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  if (arr[arr.length-1].Address=="") arr.pop();
  return arr;
}