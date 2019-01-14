// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");
const DamageType = require("../DamageType");
const CombatManager = require("../manager/CombatManager");
const Message = require("../Message");

class Circle extends Ability{
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
			message:Message.AbilityCircle,
			category:CombatManager.category
		});

		// engage
		user.engage(target);

		// determine total damage
		let hits = 2;
		let modifier = 1.75;
		let damage = target.processDamage({attacker:user, damage:user.attackPower, type:DamageType.PIERCE});
		let perHitDamage = Math.round(damage * modifier / hits);

		// start iterations
		for(let i=0;i<hits;i++){
			if(user.fighting == null) break; // avoid trying to damage someone we've already killed, basically

			// damage message
			Communicate.hit({
				actor:user,
				directObject:target,
				recipients:user.loc.contents,
				message:Message.AttackAbility,
				ability:this,
				damage:perHitDamage
			});

			// inflict damage
			target.damage(user, perHitDamage);
		}

		// busy user
		user.busy(3000);
	}
}

Circle.prototype.name = "circle";
Circle.prototype.display = "circle";
Circle.prototype.keywords = "circle";

module.exports = Circle;
