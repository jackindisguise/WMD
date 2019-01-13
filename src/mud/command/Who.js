// node includes
const util = require("util");

// local includes
const _ = require("../../../i18n");
const PlayerManager = require("../manager/PlayerManager");
const Command = require("../Command");
const CommandSpecificity = require("../CommandSpecificity");

class Who extends Command{
	exec(mob){
		let msg = _("Players Connected: %d", PlayerManager.players.length);
		for(let player of PlayerManager.players){
			msg += "\r\n";
			msg += util.format("%s", player.mob ? "["+player.mob.name+"]" : "<"+player.socketID+">");
		}

		mob.sendLine(msg);
	}
}

Who.prototype.rule = /^(?:w|wh|who)\b/i;
Who.prototype.plain = "who";
Who.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Who;
