// local includes
const _ = require("../../../i18n");
const AbilityCommand = require("../../../mud/AbilityCommand");
const CommandSpecificity = require("../../../etc/CommandSpecificity");
const AbilityManager = require("../../../mud/manager/AbilityManager");
const heal = AbilityManager.getAbilityByName("heal");

class Heal extends AbilityCommand{
	exec(mob, target){
		let victim = mob.loc.contents.search(target);
		if(victim){
			if(victim.health === victim.maxHealth) {
				mob.sendLine(_("They're already fully healed."));
				return;
			}

			heal.use(mob, victim);
			return;
		}

		mob.sendLine(_("There's nobody here like that."));
	}
}

Heal.prototype.rule = /^(?:h|he|hea|heal) (.+)/i;
Heal.prototype.plain = "heal";
Heal.prototype.specificity = CommandSpecificity.FIRST;
Heal.prototype.ability = heal;
Heal.prototype.ready = true;

module.exports = Heal;
