// local includes
var Classification = require("./Classification");

/**
 * Basic race classifier.
 * Tends to offer base stats and TNL.
 */
class Race extends Classification{
}

// progression stats
Race.prototype.toNextLevelBase = 1000;

module.exports = Race;
