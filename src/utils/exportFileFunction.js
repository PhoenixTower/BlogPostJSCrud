const { csvFileDownload } = require("./csvFileDownload")
const { excelFileDownload } = require("./excelFile")

async function exportFileFunction(
    csvDownload,
    preFileName,
    data,
    res
) {
    let tempFile = '';

    if (csvDownload) {
        tempFile = await csvFileDownload(preFileName, data, res);
    } else {
        tempFile = await excelFileDownload(preFileName, data, res);
    }

    const allSegments = tempFile.split("/");
    const fileName = allSegments[allSegments.length - 1];
    const folderName = allSegments[allSegments.length - 2];
    const filePath = `export/${folderName}/${fileName}`;

    return filePath;
}

module.exports = { exportFileFunction }