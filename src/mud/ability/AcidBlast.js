// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");
const DamageType = require("../DamageType");
const CombatManager = require("../manager/CombatManager");
const AbilityAttackMessage = require("../message/AbilityAttack");
const AbilityAcidBlastMessage = require("../message/AbilityAcidBlast");

class AcidBlast extends Ability{
	/**
	 * 
	 * @param {Mob} user 
	 * @param {Mob} target 
	 */
	use(user, target){
		// ability message
		Communicate.act({
			actor:user,
			directObject:target,
			recipients:user.loc.contents,
			message:AbilityAcidBlastMessage,
			category:CombatManager.category
		});

		// determine damage
		let damage = target.processDamage({attacker:user, damage:user.magicPower, type:DamageType.MAGICAL});

		// damage message
		Communicate.hit({
			actor:user,
			directObject:target,
			recipients:user.loc.contents,
			message:AbilityAttackMessage,
			ability:this,
			damage:damage,
			category:CombatManager.category
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
