// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var Channel = require("../Channel");
var ChannelManager = require("../manager/ChannelManager");
var PlayerManager = require("../manager/PlayerManager");
var channel = ChannelManager.getChannelByName("whisper");

class Whisper extends Command{
	exec(mob, target, message){
		if(!mob.player) return;

		if(!channel.isParticipating(mob.player)){
			mob.sendLine(_("You'll have to join the channel first."));
			return;
		}

		var victim = PlayerManager.getPlayerByName(target);
		if(!victim){
			mob.sendLine("There's nobody like that around.");
			return;
		}

		if(!channel.isParticipating(victim)){
			mob.sendLine("You can't get their attention.");
			return;
		}

		channel.transmit(mob.player, message, victim, Channel.filterSpeakerTargetOnly);
	}
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper|t|te|tel|tell) (.*?) (.+)/i;
Whisper.prototype.plain = "whisper|tell";
Whisper.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Whisper;
