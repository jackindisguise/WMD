// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");
const DamageType = require("../DamageType");
const CombatManager = require("../manager/CombatManager");

class Circle extends Ability{
	/**
	 * 
	 * @param {Mob} user 
	 * @param {Mob} target 
	 */
	use(user, target){
		user.engage(target);

		// ability message
		Communicate.act(
			user,
			{
				firstPerson: "{wYou start circling around $N. {x[{R-READY{x]",
				secondPerson: "{D$n starts circling around you.{x",
				thirdPerson: "{c$n starts circling around $N.{x"
			},
			user.loc.contents,
			{directObject:target},
			null,
			CombatManager.category
		);

		for(let i=0;i<2;i++){
			if(user.fighting == null) break; // avoid trying to damage someone we've already killed, basically

			// determine damage
			let damage = target.processDamage({attacker:user, damage:user.attackPower, type:DamageType.PIERCE});

			// damage message
			Communicate.hit({attacker:user, target:target, ability:"circle", damage:damage});

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
