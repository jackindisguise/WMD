// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ClassManager = require("../manager/ClassManager");
var Class = require("../Class");

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
	Logger.info(_("> Loading classes..."));
	deepSearch("./data/class", function(file, next){
		var f = file.slice("./data/class".length); // cut off relative path from root
		var json = require("../../../data/class/"+f);
		Logger.info(_(">> Loading class <%s> '%s'", json.name, json.display));
		var cLass = new Class();
		cLass.__fromJSON(json);
		ClassManager.add(cLass);
		next();
	}, callback);
};
