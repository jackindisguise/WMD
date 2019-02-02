// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Engage extends Command{
	exec(mob, target){
		if(mob.fighting){
			mob.sendLine(_("You're already fighting."));
			return;
		}

		let victim = mob.loc.contents.search(target);
		if(victim){
			mob.engage(victim);
			mob.combatRound();
			return;
		}

		mob.sendLine(_("There's nobody here like that."));
	}
}

Engage.prototype.rule = /^(?:e|en|eng|enga|engag|engage|k|ki|kil|kill) (.+)/i;
Engage.prototype.plain = "engage|kill";
Engage.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Engage;
