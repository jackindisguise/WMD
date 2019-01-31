// local includes
let Armor = require("./Armor");
let WearSlotType = require("../../etc/WearSlotType");

class Shield extends Armor{
}

Shield.prototype.defenseBonus = 2;
Shield.prototype.defenseBonusPerLevel = 1;
Shield.prototype.slotType = WearSlotType.OFFHAND;

/** @default "shield" */
Shield.prototype.keywords = "shield";

/** @default "Shield" */
Shield.prototype.display = "Shield";

module.exports = Shield;
