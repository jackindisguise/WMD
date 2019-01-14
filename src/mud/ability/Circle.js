// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");
const DamageType = require("../DamageType");
const CombatManager = require("../manager/CombatManager");
const AttackAbilityMessage = require("../message/AttackAbility");
const AbilityCircleMessage = require("../message/AbilityCircle");

class Circle extends Ability{
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
			message:AbilityCircleMessage,
			category:CombatManager.category
		});

		// engage
		user.engage(target);

		// start iterations
		for(let i=0;i<2;i++){
			if(user.fighting == null) break; // avoid trying to damage someone we've already killed, basically

			// determine damage
			let damage = target.processDamage({attacker:user, damage:user.attackPower, type:DamageType.PIERCE});

			// damage message
			Communicate.hit({
				actor:user,
				directObject:target,
				recipients:user.loc.contents,
				message:AttackAbilityMessage,
				ability:this,
				damage:damage,
				category:CombatManager.category
			});

			// inflict damage
			target.damage(user, damage);
		}

		// busy user
		user.busy(3000);
	}
}

Circle.prototype.name = "circle";
Circle.prototype.display = "circle";
Circle.prototype.keywords = "circle";

module.exports = Circle;
