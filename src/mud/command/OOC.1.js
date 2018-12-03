// local includes
var _ = require("../../../i18n");
var Database = require("../core/Database");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var channel = Database.getChannelByID(1);

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
OOC.prototype.plain = "ooc [message]";
OOC.prototype.specificity = CommandSpecificity.FIRST;

module.exports = OOC;
