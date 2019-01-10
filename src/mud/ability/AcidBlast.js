// local includes
const Ability = require("../Ability");
const Communicate = require("../Communicate");

class AcidBlast extends Ability{
	use(user, target){
		// determine damage
		let baseDamage = user.magicPower * 1.25;
		let damage = target.preDamage(user, baseDamage, true);

		// damage message
		Communicate.ability(user, target, "acid blast", damage);

		// inflict damage
		target.damage(user, damage);

		// unready user
		user.unready(3000);
	}
}

AcidBlast.prototype.name = "acid blast";
AcidBlast.prototype.display = "acid blast";
AcidBlast.prototype.keywords = "acid blast";

module.exports = AcidBlast;
