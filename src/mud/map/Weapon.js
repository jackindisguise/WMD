// local includes
var Equipment = require("./Equipment");

class Weapon extends Equipment{
}

/** @default "weapon" */
Weapon.prototype.keywords = "weapon";

/** @default "Weapon" */
Weapon.prototype.display = "Weapon";

module.exports = Weapon;
