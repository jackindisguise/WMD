// local includes
var Command = require("../../src/core/Command");
var Database = require("../../src/core/Database");
var channel = Database.getChannelByID(1);

class OOC extends Command.Command{
    exec(mob, input){
        if(!mob.player) return;

        if(!channel.isParticipating(mob.player)){
            mob.sendLine("You'll have to join the channel first.");
            return;
        }

        channel.chat(mob.player, input);
    }
}

OOC.prototype.rule = /^(?:o|oo|ooc) (.+)$/;
OOC.prototype.plain = "ooc [message]";
OOC.prototype.specificity = Command.SPECIFICITY.FIRST;

module.exports = OOC;
