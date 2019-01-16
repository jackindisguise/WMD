// local includes
const AbilityCommand = require("../../AbilityCommand");
const CommandSpecificity = require("../../CommandSpecificity");
const AbilityManager = require("../../manager/AbilityManager");
const heal = AbilityManager.getAbilityByName("heal");

class Heal extends AbilityCommand{
	exec(mob, target){
		let victim = mob.loc.contents.search(target);
		if(victim){
			if(victim.health === victim.maxHealth) {
				mob.sendLine("They're already fully healed.");
				return;
			}

			heal.use(mob, victim);
			return;
		}

		mob.sendLine("They aren't here.");
	}
}

Heal.prototype.rule = /^(?:h|he|hea|heal) (.+)/i;
Heal.prototype.plain = "heal";
Heal.prototype.specificity = CommandSpecificity.FIRST;
Heal.prototype.ability = heal;
Heal.prototype.ready = true;

module.exports = Heal;
