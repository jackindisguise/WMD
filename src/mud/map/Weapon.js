// local includes
const Equipment = require("./Equipment");
const WearLocation = require("../WearLocation");
const CombatAction = require("../CombatAction");

class Weapon extends Equipment{
	get attackPower(){
		let bonus = this.attackPowerBonus;
		bonus += this.level * this.attackPowerBonusPerLevel;
		return bonus;
	}
}

Weapon.prototype.attackPowerBonus = 1;
Weapon.prototype.attackPowerBonusPerLevel = 0.333;
Weapon.prototype.action = CombatAction.SLASH;

Weapon.prototype.wearLoc = WearLocation.location.WEAPON;

/** @default "weapon" */
Weapon.prototype.keywords = "weapon";

/** @default "Weapon" */
Weapon.prototype.display = "Weapon";

module.exports = Weapon;
