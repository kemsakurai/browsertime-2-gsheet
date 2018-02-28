'use strict';

const flattenObject = function(ob) {
	var toReturn = {};
	
	for (var i in ob) {
		if (!ob.hasOwnProperty(i)) continue;
		
		if ((typeof ob[i]) == 'object') {
			var flatObject = flattenObject(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				
				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
};

class GSheetMapper {
  
  map(data) {
  	let mapperResults = data.map((elem) => {
  		// statistics と、timestamps のみを取得する
		let timings = flattenObject(elem.jsonObj.statistics.timings);
		let timestamps = flattenObject(elem.jsonObj.timestamps);
		for (let key in timestamps){
			timings["timestamps." + key] = timestamps[key];
		}
  		return { 
  			"fileName" : elem.fileName,
  			"gsheetObj": timings
  		}
  	});
  	return mapperResults;
  }  
}
module.exports = GSheetMapper;
