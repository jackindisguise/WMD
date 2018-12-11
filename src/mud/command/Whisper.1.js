// local includes
var _ = require("../../../i18n");
var MUD = require("../core/MUD");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var ChannelManager = require("../manager/ChannelManager");
var channel = ChannelManager.getChannelByID(0);

class Whisper extends Command{
	exec(mob, target, message){
		if(!channel.isParticipating(mob)){
			mob.sendLine(_("You'll have to join the channel first."));
			return;
		}

		var victim = MUD.getPlayerByName(target);
		if(!victim){
			mob.sendLine("There's nobody like that around.");
			return;
		}

		victim = victim.mob;
		if(!channel.isParticipating(victim)){
			mob.sendLine("You can't get their attention.");
			return;
		}

		Communicate.act(mob, channel.format, [mob, victim], {message:message, directObject:victim});
	}
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper|t|te|tel|tell) (.*?) (.+)/;
Whisper.prototype.plain = "whisper";
Whisper.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Whisper;
