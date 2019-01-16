// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const AbilityManager = require("../manager/AbilityManager");

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

// ability loader
module.exports = function(callback){
	Logger.info(_("> Loading abilities..."));
	deepSearch("./src/ability", function(file, next){
		let f = file.slice("./src/ability".length); // cut off relative path from root
		let constructor = require("../../../src/ability/"+f);
		let ability = new constructor();
		AbilityManager.add(ability);
		Logger.info(_(">> Loaded ability '%s'", ability.name));
		next();
	}, callback);
};
