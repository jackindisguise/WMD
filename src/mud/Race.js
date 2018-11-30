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

// base stats
Race.prototype.healthBase = 100;
Race.prototype.manaBase = 100;
Race.prototype.energyBase = 100;

module.exports = Race;
