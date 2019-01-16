// local includes
const Spell = require("../mud/ability/Spell");
const Communicate = require("../mud/Communicate");
const DamageType = require("../etc/DamageType");
const Message = require("../etc/Message");

class AcidBlast extends Spell{
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
			message:Message.AbilitySpellCast,
			ability:this,
			mana:this.mana
		});

		// use resources
		this.expend(user);

		// determine damage
		let damage = target.processDamage({attacker:user, damage:user.magicPower, type:DamageType.MAGICAL});

		// damage message
		Communicate.hit({
			actor:user,
			directObject:target,
			recipients:user.loc.contents,
			message:Message.AttackAbility,
			ability:this,
			damage:damage
		});

		// inflict damage
		target.damage(user, damage);

		// closing routine
		this.busy(user);
	}
}

AcidBlast.prototype.name = "acid blast";
AcidBlast.prototype.display = "acid blast";
AcidBlast.prototype.keywords = "acid blast acidblast";
AcidBlast.prototype.mana = 5;
AcidBlast.prototype.delay = 3000;

module.exports = AcidBlast;
