// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var RaceManager = require("../manager/RaceManager");
var Race = require("../Race");

// race loader
module.exports = function(callback){
	Logger.info(_("> Loading races..."));
	fs.readdir("./data/race", function(err, files){
		for(var file of files){
			var json = require("../../../data/race/"+file);
			var race = new Race();
			race.__fromJSON(json);
			RaceManager.add(race);
			Logger.info(_(">> Loaded race '%s'", race.name));
		}
	
		callback();
	});
};
