// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const CommandManager = require("../manager/CommandManager");

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
	Logger.info(_("> Loading commands..."));
	deepSearch("./src/stock/command", function(file, next){
		let f = file.slice("./src/stock/command".length); // cut off relative path from root
		let constructor = require("../../../src/stock/command/"+f);
		let command = new constructor();
		if(command.rule) {
			CommandManager.add(command);
			Logger.info(_(">> Loaded command '%s'", command.plain));
		}
		next();
	}, function(){
		CommandManager.sortCommandsBySpecificity();
		callback();
	});
};