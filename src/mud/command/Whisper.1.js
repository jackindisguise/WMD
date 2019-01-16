// local includes
const _ = require("../../../i18n");
const Command = require("../Command");
const CommandSpecificity = require("../etc/CommandSpecificity");
const Channel = require("../Channel");
const ChannelManager = require("../manager/ChannelManager");
const PlayerManager = require("../manager/PlayerManager");
const channel = ChannelManager.getChannelByName("whisper");

class Whisper extends Command{
	exec(mob, target, message){
		if(!mob.player) return;

		if(!channel.isParticipating(mob.player)){
			mob.sendLine(_("You'll have to join the channel first."));
			return;
		}

		let victim = PlayerManager.getPlayerByName(target);
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
