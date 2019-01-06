// node includes
var util = require("util");

// local includes
var _ = require("../../../i18n");
var PlayerManager = require("../manager/PlayerManager");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Who extends Command{
	exec(mob){
		var msg = _("Players Connected: %d", PlayerManager.players.length);
		for(var player of PlayerManager.players){
			msg += "\r\n";
			msg += util.format("%s", player.mob ? "["+player.mob.name+"]" : "{"+player.socketID+"}");
		}

		mob.sendLine(msg);
	}
}

Who.prototype.rule = /^(?:w|wh|who)\b/i;
Who.prototype.plain = "who";
Who.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Who;
