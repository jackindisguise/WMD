// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var CombatManager = require("../manager/CombatManager");

class Engage extends Command{
	exec(mob, target){
		var victim = mob.loc.contents.search(target);
		if(victim){
			mob.engage(victim);
			mob.combatRound();
		}
	}
}

Engage.prototype.rule = /^(?:e|en|eng|enga|engag|engage) (.+)/;
Engage.prototype.plain = "engage";
Engage.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Engage;
