// local includes
var Movable = require("./Movable");

class Item extends Movable{

}

/**
 * The item level.
 * Dictates stat bonuses, damage, defense, etc...
 */
Item.prototype.level = 0;

/** @default "item" */
Item.prototype.keywords = "item";

/** @default "item" */
Item.prototype.display = "Item";

module.exports = Item;
