// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ModelManager = require("../manager/ModelManager");
var Model = require("../Model");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		var waiting = files.length;
		function next() { waiting--; if(waiting === 0) callback(); }
		for(var file of files){
			var _file = directory+"/"+file;
			var stats = fs.lstatSync(_file);
			if(stats.isDirectory()) deepSearch(_file, fileFun, next);
			else fileFun(_file, next);
		}
	});
}

module.exports = function(callback){
	Logger.info(_("> Loading models..."));
	deepSearch("./data/model", function(file, next){
		var f = file.slice("./data/model".length); // cut off relative path from root
		var _model = require("../../../data/model/"+f);
		var model = new Model();
		model.__fromJSON(_model);
		ModelManager.add(model);
		Logger.info(_(">> Loaded model for <%s>", model.name));
		next();
	}, callback);
};
