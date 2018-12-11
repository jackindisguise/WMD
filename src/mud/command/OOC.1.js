// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var ChannelManager = require("../manager/ChannelManager");
var channel = ChannelManager.getChannelByID(1);

class OOC extends Command{
	exec(mob, message){
		if(!mob.player) return;

		if(!channel.isParticipating(mob)){
			mob.sendLine(_("You'll have to join the channel first."));
			return;
		}

		channel.transmit(mob, message);
	}
}

OOC.prototype.rule = /^(?:o|oo|ooc) (.+)\b/;
OOC.prototype.plain = "ooc";
OOC.prototype.specificity = CommandSpecificity.FIRST;

module.exports = OOC;
