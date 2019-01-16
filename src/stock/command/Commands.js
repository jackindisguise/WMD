// node includes
const util = require("util");

// local includes
require("../../lib/String");
const _ = require("../../../i18n");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const CommandManager = require("../../mud/manager/CommandManager");
const Command = require("../../mud/Command");

class Commands extends Command{
	exec(mob){
		let msg = util.format("- %s -", _("Commands")).padRight(80, "-");
		let commands = CommandManager.commands;
		let blockSize = 4;
		let block = Math.ceil(commands.length/blockSize)*blockSize;
		let line = "";
		for(let i=0;i<block;i++){
			let command = commands[i];
			line += util.format("%s %s %s", "|", (command ? (command.error ? "!" : "") + command.plain : "").padRight(16), (i%blockSize) === blockSize-1 ? "|" : " ");

			if(((i+1)%4) === 0){
				msg += "\r\n"+line;
				line = "";
			}
		}

		msg += "\r\n"+"".padRight(80, "-");
		mob.sendLine(msg);
	}
}

Commands.prototype.rule = /^(?:c|co|com|comm|comma|comman|command|commands)\b/i;
Commands.prototype.plain = "commands";
Commands.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Commands;
