// local includes
var _ = require("../../i18n");
var MUD = require("../../src/core/MUD");
var Command = require("../../src/core/Command");
var Database = require("../../src/core/Database");
var MessageCategory = require("../../src/core/MessageCategory");
var channel = Database.getChannelByID(3);

class Whisper extends Command.Command{
    exec(mob, targetName, message){
        if(!mob.player) return;

        if(!channel.isParticipating(mob.player)){
            mob.sendLine(_("You'll have to join the channel first."));
            return;
        }

        var target = MUD.getPlayerByName(targetName);
        if(!target){
            mob.sendLine(_("There's nobody with that name arund."));
            return;
        }

        // this will be hacky
        target.sendMessage(_(channel.format.thirdPerson, mob.name, message), MessageCategory.CHAT);
        mob.sendMessage(_(channel.format.firstPerson, target.mob.name, message), MessageCategory.CHAT);
    }
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper) (.*?) (.+)$/;
Whisper.prototype.plain = "whisper [player] [message]";
Whisper.prototype.specificity = Command.SPECIFICITY.FIRST;

module.exports = Whisper;
