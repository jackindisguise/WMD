// node includes
var util = require("util");

// local includes
var Movement = require("./Movement");
var Direction = require("../Direction");

class West extends Movement{
}

West.prototype.rule = /^(?:w|we|wes|west)\b/;
West.prototype.plain = "west";
West.prototype.direction = Direction.flag.WEST;

module.exports = West;
