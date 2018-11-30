// local includes
var _ = require("../../i18n");
var Command = require("../../src/core/Command");
var Database = require("../../src/core/Database");
var channel = Database.getChannelByID(1);

class Whisper extends Command.Command{
    exec(mob){
        if(!mob.player) return;

        if(!channel.isParticipating(mob.player)){
            mob.sendLine(_("You'll have to join the channel first."));
            return;
        }

        mob.sendLine(_("Whisper what to whom?"));
    }
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper)$/;
Whisper.prototype.plain = "whisper";
Whisper.prototype.specificity = Command.SPECIFICITY.LAST-1;

module.exports = Whisper;
