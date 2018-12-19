// local includes
var Equipment = require("./Equipment");
var WearLocation = require("../WearLocation");

class Weapon extends Equipment{
}

Weapon.prototype.wearLoc = WearLocation.locations.WEAPON;

/** @default "weapon" */
Weapon.prototype.keywords = "weapon";

/** @default "Weapon" */
Weapon.prototype.display = "Weapon";

module.exports = Weapon;
