// local includes
var Classification = require("./Classification");

/**
 * Basic class classifier.
 * Tends to offer base attributes and attributes per level.
 */
class Class extends Classification{
}

// base primary attributes
Class.prototype.strengthBase = 10;
Class.prototype.intelligenceBase = 10;
Class.prototype.agilityBase = 10;

module.exports = Class;
