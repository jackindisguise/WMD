// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var RaceManager = require("../manager/RaceManager");
var Race = require("../Race");

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
	Logger.info(_("> Loading races..."));
	deepSearch("./data/race", function(file, next){
		var f = file.slice("./data/race".length); // cut off relative path from root
		var json = require("../../../data/race/"+f);
		Logger.info(_(">> Loading race <%s> '%s'", json.name, json.display));
		var race = new Race();
		race.__fromJSON(json);
		RaceManager.add(race);
		next();
	}, callback);
};
