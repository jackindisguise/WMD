// local includes
const Equipment = require("./Equipment");

class Armor extends Equipment{
	get defense(){
		let bonus = this.defenseBonus;
		bonus += this.level * this.defenseBonusPerLevel;
		return bonus;
	}
}

Armor.prototype.defenseBonus = 1;
Armor.prototype.defenseBonusPerLevel = 0.333;

/** @default "armor" */
Armor.prototype.keywords = "armor";

/** @default "Armor" */
Armor.prototype.display = "Armor";

module.exports = Armor;
