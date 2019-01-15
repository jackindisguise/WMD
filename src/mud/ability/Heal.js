// local includes
const Spell = require("../Spell");
const Communicate = require("../Communicate");
const Message = require("../Message");

class Heal extends Spell{
	/**
	 * 
	 * @param {Mob} user 
	 * @param {Mob} target 
	 */
	use(user, target){
		// ability message
		Communicate.busy({
			actor:user,
			directObject:target,
			recipients:user.loc.contents,
			message:Message.AbilityPray,
			ability:this
		});

		// determine total heal power
		let heal = user.magicPower / 2;

		// heal message
		Communicate.heal({
			actor:user,
			directObject:target,
			recipients:user.loc.contents,
			message:target === user ? Message.HealAbilitySelf : Message.HealAbility,
			ability:this,
			heal:heal
		});

		// inflict regeneration
		target.heal({health:heal});

		// busy user
		user.busy(6000);
	}
}

Heal.prototype.name = "heal";
Heal.prototype.display = "heal";
Heal.prototype.keywords = "heal";

module.exports = Heal;
