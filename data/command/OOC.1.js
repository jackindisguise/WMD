// local includes
var Command = require("../../src/mud/Command");
var Database = require("../../src/mud/core/Database");

class OOC extends Command.Command{
    exec(mob, message){
        if(!mob.player) return;

        var channel = Database.getChannelByID(1);
        if(!channel.isParticipating(mob)){
            mob.sendLine("You'll have to join the channel first.");
            return;
        }

        channel.transmit(mob, message);
    }
}

OOC.prototype.rule = /^(?:o|oo|ooc) (.+)$/;
OOC.prototype.plain = "ooc [message]";
OOC.prototype.specificity = Command.SPECIFICITY.FIRST;

module.exports = OOC;
