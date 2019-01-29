// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const ClassManager = require("../manager/ClassManager");
const AbilityManager = require("../manager/AbilityManager");
const Class = require("../Class");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		if(err) return;
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

		// process abilities
		if(json.abilities){
			for(let i=0;i<json.abilities.length;i++){
				let learn = json.abilities[i];
				let ability = AbilityManager.getAbilityByName(learn.ability);
				if(!ability){
					Logger.error(_("BAD ABILITY NAME FOR CLASS '%s': '%s'", cLass.name, learn.ability));
					json.abilities.splice(i, 1);
					i--;
					continue;
				}

				learn.ability = ability;
			}
		}

		ClassManager.add(cLass);
		next();
	}, callback);
};
