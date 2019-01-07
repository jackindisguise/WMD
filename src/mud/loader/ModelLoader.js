// node includes
const fs = require("fs");

// local includes
require("../../lib/Object");
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const ModelManager = require("../manager/ModelManager");
const Model = require("../Model");

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
	Logger.info(_("> Loading models..."));
	deepSearch("./data/model", function(file, next){
		let f = file.slice("./data/model".length); // cut off relative path from root
		let json = require("../../../data/model/"+f);
		Logger.info(_(">> Loading model for <%s>", json.name));
		let model = new Model();
		model.__fromJSON(json);
		ModelManager.add(model);
		next();
	}, callback);
};
