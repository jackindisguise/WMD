// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const ChannelManager = require("../../mud/manager/ChannelManager");
const channel = ChannelManager.getChannelByName("say");

class Say extends Command{
	exec(mob){
		mob.sendLine(_("What do you want to say?"));
	}
}

Say.prototype.rule = /^(?:s|sa|say)\b/i;
Say.prototype.plain = "say";
Say.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Say;
