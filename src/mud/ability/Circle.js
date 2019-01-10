// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");

class Circle extends Ability{
	use(user, target){
		user.engage(target);
		for(let i=0;i<2;i++){
			if(user.fighting == null) break; // avoid trying to damage someone we've already killed, basically

			// determine damage
			let baseDamage = user.attackPower;
			let damage = target.preDamage(user, baseDamage, false);

			// damage message
			Communicate.ability(user, target, "circle", damage);

			// inflict damage
			target.damage(user, damage);
		}

		// unready user
		user.unready(3000);
	}
}

Circle.prototype.name = "circle";
Circle.prototype.display = "circle";
Circle.prototype.keywords = "circle";

module.exports = Circle;
