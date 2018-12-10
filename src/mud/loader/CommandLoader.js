// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var CommandManager = require("../manager/CommandManager");

// command loader
module.exports = function(callback){
	Logger.info(_("> Loading commands..."));
	fs.readdir("./src/mud/command/", function(err, files){
		for(var file of files){
			var constructor = require("../command/"+file);
			var command = new constructor();
			if(!command.rule) continue;
			CommandManager.add(command);
			Logger.info(_(">> Loaded command '%s'", command.plain));
		}

		Logger.info(_("< Commands loaded..."));
		CommandManager.sortCommandsBySpecificity();
		callback();
	});
};