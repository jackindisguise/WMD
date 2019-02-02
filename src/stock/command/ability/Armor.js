// local includes
const _ = require("../../../../i18n");
const AbilityCommand = require("../../../mud/AbilityCommand");
const CommandSpecificity = require("../../../etc/CommandSpecificity");
const AbilityManager = require("../../../mud/manager/AbilityManager");
const armor = AbilityManager.getAbilityByName("armor");

class Armor extends AbilityCommand{
	exec(mob, target){
		let victim = mob.loc.contents.search(target);
		if(victim){
			if(victim.hasEffectByName("armor")) {
				mob.sendLine(_("They're already armored."));
				return;
			}

			armor.use(mob, victim);
			return;
		}

		mob.sendLine(_("They aren't here."));
	}
}

Armor.prototype.rule = /^(?:a|ar|arm|armo|armor) (.+)/i;
Armor.prototype.plain = "armor";
Armor.prototype.specificity = CommandSpecificity.FIRST;
Armor.prototype.ability = armor;
Armor.prototype.ready = true;

module.exports = Armor;
