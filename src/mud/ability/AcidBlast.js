// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");
const DamageType = require("../DamageType");
const CombatManager = require("../manager/CombatManager");

class AcidBlast extends Ability{
	/**
	 * 
	 * @param {Mob} user 
	 * @param {Mob} target 
	 */
	use(user, target){
		// determine damage
		let damage = target.processDamage({attacker:user, damage:user.magicPower, type:DamageType.MAGICAL});

		// ability message
		Communicate.act(
			user,
			{
				firstPerson: "You begin to chant a spell. [-READY}]",
				thirdPerson: "$n begins chanting a spell."
			},
			user.loc.contents,
			{directObject:target},
			null,
			CombatManager.category
		);

		// damage message
		Communicate.hit({attacker:user, target:target, ability:"acid blast", damage:damage});

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
