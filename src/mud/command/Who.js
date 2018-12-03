// local includes
var _ = require("../../../i18n");
var MUD = require("../core/MUD");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Who extends Command{
	exec(mob){
		var msg = _("Players Connected: %d", MUD.players.length);
		for(var player of MUD.players){
			msg += "\r\n";
			msg += _("%s", player.mob ? "["+player.mob.name+"]" : "{"+player.socketID+"}");
		}

		mob.sendLine(msg);
	}
}

Who.prototype.rule = /^(?:w|wh|who)\b/;
Who.prototype.plain = "who";
Who.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Who;
