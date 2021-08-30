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
  worksheet["A1"].t = 's';
  worksheet["A1"].s = {
    font: {
      name: "Calibri",
      sz: 24,
      bold: true,
      color: { rgb: "FFFFAA00" },
    },
  };
/*   worksheet["A1"].s = { 
    fill: {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF1c4587'},
        bgColor:{argb:'FF1c4587'}
    }
  };
   */
  /* worksheet.forEach(worksheet, (v, c) => {
    if (c !== '!ref') {
        if (header.indexOf(v.v) >= 0) {
          worksheet[c]['s'] = {
                fill: {
                patternType: 'solid', // none / solid
                fgColor: {rgb: 'FFD3D3D3'}
                }
            }
        }
    }
}) */

  // const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);

};