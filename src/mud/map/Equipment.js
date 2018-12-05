// local includes
var Item = require("./Item");

class Equipment extends Item{
}

/** @default "equipment" */
Equipment.prototype.keywords = "item";

/** @default "Equipment" */
Equipment.prototype.display = "Item";

module.exports = Equipment;
