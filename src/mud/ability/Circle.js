// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");

class Circle extends Ability{
	use(user, target){
		for(var i=0;i<2;i++){
			if(user.fighting == null) break;

			// determine damage
			let baseDamage = user.attackPower;
			let damage = target.preDamage(user, baseDamage, false);

			// damage message
			Communicate.ability(user, target, "circle", damage);

			// inflict damage
			target.damage(user, damage);
		}
	}
}

Circle.prototype.name = "circle";
Circle.prototype.display = "circle";
Circle.prototype.keywords = "circle";

module.exports = Circle;
