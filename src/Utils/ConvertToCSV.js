// JSON to CSV Converter
export default function ConvertToCSV(items) {

    var jsonObj = JSON.stringify(items);

    var array = typeof jsonObj != 'object' ? JSON.parse(jsonObj) : jsonObj;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}