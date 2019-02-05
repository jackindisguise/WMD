// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const ChannelManager = require("../../mud/manager/ChannelManager");
const channel = ChannelManager.getChannelByName("say");

// message filter
function ChannelFilterSameRoom(recipient, options){
    if(recipient.mob.loc === options.speaker.mob.loc) return true;
    return false;
}

class Say extends Command{
	exec(mob, message){
		if(!mob.player) return;

		if(!channel.isParticipating(mob.player)){
			mob.sendLine(_("You'll have to join the channel first."));
			return;
		}

		channel.transmit({speaker:mob.player, message:message, filter:ChannelFilterSameRoom});
	}
}

Say.prototype.rule = /^(?:s|sa|say) (.+)\b/i;
Say.prototype.plain = "say";
Say.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Say;
