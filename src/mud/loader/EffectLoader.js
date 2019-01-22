// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const EffectManager = require("../manager/EffectManager");

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

// command loader
module.exports = function(callback){
	Logger.info(_("> Loading effects..."));
	deepSearch("./src/stock/effect", function(file, next){
		let f = file.slice("./src/stock/effect".length); // cut off relative path from root
		let constructor = require("../../../src/stock/effect/"+f);
		let effect = new constructor();
		EffectManager.add(effect);
		Logger.info(_(">> Loaded effect '%s'", effect.name));
		next();
	}, callback);
};