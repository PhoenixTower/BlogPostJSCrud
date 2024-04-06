const ExcelJS = require('exceljs');
const fs = require('fs');

const excelFileDownload = async (
  addWorksheet,
  array
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(addWorksheet);
  const result = Object.keys(Object.assign({}, ...array));

  const columns = [];
  result.forEach((column) =>
    columns.push({
      header: column,
      key: column,
      width: 15
    })
  );
  worksheet.columns = columns;

  worksheet.addRows(array);

  fs.mkdirSync('./src/download/excel/', { recursive: true });

  const time = new Date().getTime();
  const fileName = `./src/download/excel/${addWorksheet}-${time}.xlsx`;

  await workbook.xlsx.writeFile(fileName);

  return fileName;
};

module.exports = { excelFileDownload };