// local includes
let Armor = require("./Armor");
let WearLocation = require("../WearLocation");

class Shield extends Armor{
}

Shield.prototype.defenseBonus = 2;
Shield.prototype.defenseBonusPerLevel = 1;
Shield.prototype.wearLoc = WearLocation.location.SHIELD;

/** @default "shield" */
Shield.prototype.keywords = "shield";

/** @default "Shield" */
Shield.prototype.display = "Shield";

module.exports = Shield;
