// local includes
const Skill = require("../mud/Skill");
const Communicate = require("../mud/Communicate");
const DamageType = require("../etc/DamageType");
const Message = require("../etc/Message");

class Circle extends Skill{
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
			message:Message.AbilityCircle,
			energy:this.energy
		});

		// use resources
		this.expend(user);

		// engage
		user.engage(target);

		// determine total damage
		let hits = 3;
		let modifier = 1.5;
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

		// closing routine
		this.busy(user);
	}
}

Circle.prototype.name = "circle";
Circle.prototype.display = "circle";
Circle.prototype.keywords = "circle";
Circle.prototype.energy = 5;
Circle.prototype.delay = 3000;

module.exports = Circle;
