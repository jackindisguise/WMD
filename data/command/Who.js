// local includes
var MUD = require("../../src/core/MUD");
var Command = require("../../src/core/Command");
var _ = require("../../i18n");

class Who extends Command.Command{
    exec(mob){
        var msg = _("Players Connected: %d", MUD.players.length);
        for(var player of MUD.players){
            msg += "\r\n";
            msg += _("%s", player.mob ? "["+player.mob.name+"]" : "{"+player.socketID+"}");
        }

        mob.sendLine(msg);
    }
}

Who.prototype.rule = /^(?:w|wh|who)/;
Who.prototype.plain = "who";
Who.prototype.specificity = Command.SPECIFICITY.FIRST;

module.exports = Who;
