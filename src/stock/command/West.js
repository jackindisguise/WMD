// local includes
const Movement = require("./Movement");
const Direction = require("../../etc/Direction");

class West extends Movement{
}

West.prototype.rule = /^(?:w|we|wes|west)\b/i;
West.prototype.plain = "west";
West.prototype.direction = Direction.flag.WEST;

module.exports = West;
