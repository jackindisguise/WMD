// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const ChannelManager = require("../../mud/manager/ChannelManager");
const PlayerManager = require("../../mud/manager/PlayerManager");
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

		channel.transmit({speaker:mob.player, target:victim, message:message});
	}
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper|t|te|tel|tell) (?:to )?(.*?) (.+)/i;
Whisper.prototype.plain = "whisper|tell";
Whisper.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Whisper;
