// local includes
const Spell = require("../mud/Spell");
const Communicate = require("../mud/Communicate");
const Message = require("../etc/Message");

class Heal extends Spell{
	/**
	 * 
	 * @param {Mob} user 
	 * @param {Mob} target 
	 */
	use(user, target){
		// opening routine
		if(!this.check(user)) return;

		// ability message
		Communicate.ability({
			actor:user,
			directObject:target,
			recipients:user.loc.contents,
			message:Message.AbilityPray,
			ability:this,
			mana:this.mana
		});

		// use resources
		this.expend(user);

		// determine total heal power
		let heal = Math.floor(user.magicPower / 2);

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
	
		// closing routine
		this.busy(user);
	}
}

Heal.prototype.name = "heal";
Heal.prototype.display = "heal";
Heal.prototype.keywords = "heal";
Heal.prototype.mana = 5;
Heal.prototype.delay = 6000;

module.exports = Heal;
