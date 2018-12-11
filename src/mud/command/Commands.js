// node includes
var util = require("util");

// local includes
require("../../lib/String");
var _ = require("../../../i18n");
var CommandSpecificity = require("../CommandSpecificity");
var CommandManager = require("../manager/CommandManager");
var Command = require("../Command");

class Commands extends Command{
	exec(mob, message){
		var msg = util.format("- %s -", _("Commands")).padRight(80, "-");
		var commands = CommandManager.commands;
		var blockSize = 4;
		var block = Math.ceil(commands.length/blockSize)*blockSize;
		var line = "";
		for(var i=0;i<block;i++){
			var command = commands[i];
			line += util.format("%s %s %s", "|", (command ? (command.error ? "!" : "") + command.plain : "").padRight(16), (i%blockSize) == blockSize-1 ? "|" : " ");

			if(((i+1)%4) == 0){
				msg += "\r\n"+line;
				line = "";
			}
		}

		msg += "\r\n"+"".padRight(80, "-");
		mob.sendLine(msg);
	}
}

Commands.prototype.rule = /^(?:c|co|com|comm|comma|comman|command|commands)\b/;
Commands.prototype.plain = "commands";
Commands.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Commands;
