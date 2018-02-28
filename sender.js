'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const log = require('intel').getLogger('plugin-gsheet');
const shell = require('shelljs');

function getSheetByName(sheetName, worksheets) {
    if (typeof worksheets === "SpreadsheetWorksheet") {
      console.log("worksheets.title=" + worksheets.title);
      return worksheets;
    }
    for (let i = 0; i < worksheets.length; i++) {
      if(sheetName == worksheets[i].title) {
        console.log("worksheets[i].title=" + worksheets[i].title);
        return worksheets[i];
      }
    }
}

class GSheetSender {
  constructor(clientSecretPath,spreadSheetId, sheetName, jsonFileDir) {
    this.clientSecretPath = clientSecretPath;
    this.spreadSheetId = spreadSheetId;
    this.sheetName = sheetName;
    this.jsonFileDir = jsonFileDir;
  }

  send(data) {
      console.log(data);
      let senderResults = new Array();
      const credentials = require(this.clientSecretPath);
      let spreadSheet = new GoogleSpreadsheet(this.spreadSheetId);
      spreadSheet.useServiceAccountAuth(credentials, (err) => {
        // move dir
        shell.cd(this.jsonFileDir);
        spreadSheet.getInfo((err, sheetInfo) => {
          let worksheet = getSheetByName(this.sheetName, sheetInfo.worksheets);
          data.forEach((elem) => {
              worksheet.addRow(elem.gsheetObj, (err) => {
                if (err){
                  console.log("FAILED filename=" + elem.fileName);
                } else {
                  console.log("SUCCESSED filename=" + elem.fileName);
                  
                  shell.rm("-f", elem.fileName);
                }
              });
          });
        });
      });
  }
}
module.exports = GSheetSender;
