// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var CombatManager = require("../manager/CombatManager");

class Engage extends Command{
	exec(mob, target){
		if(mob.fighting){
			mob.sendLine("You're already fighting.");
			return;
		}

		var victim = mob.loc.contents.search(target);
		if(victim){
			mob.engage(victim);
			mob.combatRound();
		}
	}
}

Engage.prototype.rule = /^(?:e|en|eng|enga|engag|engage|k|ki|kil|kill) (.+)/;
Engage.prototype.plain = "engage|kill";
Engage.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Engage;
