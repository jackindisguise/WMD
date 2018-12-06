// local includes
var Item = require("./Item");

class Equipment extends Item{
}

/** @default "equipment" */
Equipment.prototype.keywords = "equipment";

/** @default "Equipment" */
Equipment.prototype.display = "Equipment";

module.exports = Equipment;
