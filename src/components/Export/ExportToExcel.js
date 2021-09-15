import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default function ExportToExcel(apiData) {

  const fileName = "Liste_Etudiants";
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const header = Object.keys(apiData[0]); // columns name
  var wscols = [];
  for (var i = 0; i < header.length; i++) {  // columns length added
    wscols.push({ wch: header[i].length })
  }
  const worksheet = XLSX.utils.json_to_sheet(apiData);
  worksheet["!cols"] = wscols;
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);

};