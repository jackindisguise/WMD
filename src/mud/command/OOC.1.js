// local includes
var Database = require("../core/Database");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class OOC extends Command{
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
OOC.prototype.specificity = CommandSpecificity.FIRST;

module.exports = OOC;
