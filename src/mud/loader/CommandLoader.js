// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const CommandManager = require("../manager/CommandManager");

// command loader
module.exports = function(callback){
	Logger.info(_("> Loading commands..."));
	fs.readdir("./src/mud/command/", function(err, files){
		for(let file of files){
			let constructor = require("../command/"+file);
			let command = new constructor();
			if(!command.rule) continue;
			CommandManager.add(command);
			Logger.info(_(">> Loaded command '%s'", command.plain));
		}

		CommandManager.sortCommandsBySpecificity();
		callback();
	});
};