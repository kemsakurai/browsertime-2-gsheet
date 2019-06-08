'use strict';

require('shelljs/global')
const program = require('commander')
const GSheetSender = require('./sender');
const JsonReader = require('./reader');
const GSheetMapper = require('./mapper');

program
  .version('0.1.0')
  .option('-s, --sheetname <sheetname>', 'SheetName for browsertime')
  .option('-i, --spreadsheetid <spreadsheetid>', 'SpreadsSeetId for browsertime')
  .option('-d, --jsonfiledir <jsonfiledir>', 'JsonFileDir of browsertime result')
  .option('-c, --clientsecretpath <clientsecretpath>', 'clientsecret of GSheet')
  .parse(process.argv);
  
const main = async (program) => {  
  // ファイルをディレクトリから読み込み
  const jsonReader = new JsonReader(program.jsonfiledir);
  const readerResults = jsonReader.read();
  
  // 読み出した結果を変換する
  const gSheetMapper = new GSheetMapper();
  const mapperResults = gSheetMapper.map(readerResults);

  // GSheetに送信する
  const gSheetSender = new GSheetSender(program.clientsecretpath, 
    program.spreadsheetid,
    program.sheetname,
    program.jsonfiledir
    );
  gSheetSender.send(mapperResults);
};

main(program);
