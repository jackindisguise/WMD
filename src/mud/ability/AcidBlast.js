// local includes
const Spell = require("../Spell");
const Communicate = require("../Communicate");
const DamageType = require("../DamageType");
const Message = require("../Message");

class AcidBlast extends Spell{
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
			message:Message.AbilitySpellCast,
			ability:this
		});

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

		// busy user
		user.busy(3000);
	}
}

AcidBlast.prototype.name = "acid blast";
AcidBlast.prototype.display = "acid blast";
AcidBlast.prototype.keywords = "acid blast";

module.exports = AcidBlast;
