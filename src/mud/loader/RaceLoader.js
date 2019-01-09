// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const RaceManager = require("../manager/RaceManager");
const AbilityManager = require("../manager/AbilityManager");
const Race = require("../Race");

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
	Logger.info(_("> Loading races..."));
	deepSearch("./data/race", function(file, next){
		let f = file.slice("./data/race".length); // cut off relative path from root
		let json = require("../../../data/race/"+f);
		Logger.info(_(">> Loading race <%s> '%s'", json.name, json.display));
		let race = new Race();
		race.__fromJSON(json);

		// process abilities
		if(json.abilities){
			for(let i=0;i<json.abilities.length;i++){
				let learn = json.abilities[i];
				let ability = AbilityManager.getAbilityByName(learn.ability);
				if(!ability){
					Logger.error(_("BAD ABILITY NAME FOR RACE '%s': '%s'", race.name, learn.ability));
					json.abilities.splice(i, 1);
					i--;
					continue;
				}

				learn.ability = ability;
			}
		}

		RaceManager.add(race);
		next();
	}, callback);
};
