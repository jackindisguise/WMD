// local includes
const AbilityCommand = require("../../AbilityCommand");
const CommandSpecificity = require("../../CommandSpecificity");
const AbilityManager = require("../../manager/AbilityManager");
const heal = AbilityManager.getAbilityByName("heal");

class Heal extends AbilityCommand{
	exec(mob){
		if(mob.health === mob.maxHealth) {
			mob.sendLine("You're already fully healed.");
			return;
		}

		heal.use(mob, mob);
	}
}

Heal.prototype.rule = /^(?:h|he|hea|heal)$/i;
Heal.prototype.plain = "heal";
Heal.prototype.specificity = CommandSpecificity.FIRST;
Heal.prototype.ability = heal;
Heal.prototype.ready = true;

module.exports = Heal;
