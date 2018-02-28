'use strict';
const shell = require('shelljs');

class JsonReader {
  constructor(jsonFileDir) {
    this.jsonFileDir = jsonFileDir;
  }

  read() {
  	let results = new Array();
    shell.cd(this.jsonFileDir);
  	let files = shell.ls('*.json');
  	for (let i = 0; i < files.length; i++) {
  		if(i == files.length -1) {
  			// 更新日時の最も新しいファイルは書き込みの対象外にする
  			continue;
  		}
  		let jsonObj = JSON.parse(shell.cat(files[i]));
  		let result = {
  			fileName : files[i],
  			jsonObj : jsonObj
  		}
  		results.push(result);
  	}
  	return results;
  }
}

module.exports = JsonReader;
