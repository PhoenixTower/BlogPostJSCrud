
const fs = require('fs');
const { writeToPath } = require('@fast-csv/format');

const csvFileDownload = async (fileName, csvArray) => {
  return new Promise((resolve) => {
    try {
      console.log("csvArray::",csvArray);
      fs.mkdirSync('./src/download/csv/', { recursive: true });
      const time = new Date().getTime();
      const file = `./src/download/csv/${fileName}-${time}.csv`;
      const flatCsvArray = csvArray.map(row => row[0]);
      writeToPath(file, flatCsvArray, { headers: true })
        .on('error', (err) => console.error(err)) 
        .on('finish', () => {
          resolve(file);
        });
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = { csvFileDownload };
