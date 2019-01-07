// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const ClassManager = require("../manager/ClassManager");
const Class = require("../Class");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		let waiting = files.length;
		function next() { waiting--; if(waiting === 0) callback(); }
		for(let file of files){
			let _file = directory+"/"+file;
			let stats = fs.lstatSync(_file);
			if(stats.isDirectory()) deepSearch(_file, fileFun, next);
			else fileFun(_file, next);
		}
	});
}

module.exports = function(callback){
	Logger.info(_("> Loading classes..."));
	deepSearch("./data/class", function(file, next){
		let f = file.slice("./data/class".length); // cut off relative path from root
		let json = require("../../../data/class/"+f);
		Logger.info(_(">> Loading class <%s> '%s'", json.name, json.display));
		let cLass = new Class();
		cLass.__fromJSON(json);
		ClassManager.add(cLass);
		next();
	}, callback);
};
