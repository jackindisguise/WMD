// local includes
const Spell = require("../../mud/ability/Spell");
const Communicate = require("../../mud/Communicate");
const Message = require("../../etc/Message");
const ArmorEffect = require("../effect/Armor");

class Armor extends Spell{
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
			message:Message.AbilitySpellCast,
			ability:this,
			mana:this.mana
		});

		// use resources
		this.expend(user);

		// determine effect properties
		let level = user.magicPower;
		let armor = new ArmorEffect();
		armor.level = level;
		armor.duration = 1000 * 60 * 5;

		// apply effect
		armor.apply(target);
	
		// closing routine
		this.busy(user);
	}
}

Armor.prototype.name = "armor";
Armor.prototype.display = "armor";
Armor.prototype.keywords = "armor";
Armor.prototype.mana = 3;
Armor.prototype.delay = 1000;

module.exports = Armor;
