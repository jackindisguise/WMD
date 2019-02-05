// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const ChannelManager = require("../../mud/manager/ChannelManager");
const channel = ChannelManager.getChannelByName("ooc");

class OOC extends Command{
	exec(mob, message){
		if(!mob.player) return;

		if(!channel.isParticipating(mob.player)){
			mob.sendLine(_("You'll have to join the channel first."));
			return;
		}

		channel.transmit({speaker:mob.player, message:message});
	}
}

OOC.prototype.rule = /^(?:o|oo|ooc) (.+)\b/i;
OOC.prototype.plain = "ooc";
OOC.prototype.specificity = CommandSpecificity.FIRST;

module.exports = OOC;
