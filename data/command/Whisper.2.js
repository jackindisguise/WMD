// local includes
var _ = require("../../i18n");
var MUD = require("../../src/core/MUD");
var Command = require("../../src/core/Command");
var Database = require("../../src/core/Database");
var channel = Database.getChannelByID(1);

class Whisper extends Command.Command{
    exec(mob, targetName){
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

        mob.sendLine(_("Sure, but what do you want to whisper them?"));
    }
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper) (.*?)$/;
Whisper.prototype.plain = "whisper [player]";
Whisper.prototype.specificity = Command.SPECIFICITY.LAST;

module.exports = Whisper;
