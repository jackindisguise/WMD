// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");

class Circle extends Ability{
	use(user, target){
		// determine damage
		let baseDamage = user.attackPower*1.5;
		let damage = target.preDamage(user, baseDamage, false);

		// damage message
		Communicate.ability(user, target, "circle", damage);

		// inflict damage
		target.damage(user, damage);
	}
}

Circle.prototype.name = "circle";
Circle.prototype.display = "circle";
Circle.prototype.keywords = "circle";

module.exports = Circle;
