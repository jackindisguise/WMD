// local includes
const Movement = require("./Movement");
const Direction = require("../Direction");

class East extends Movement{
}

East.prototype.rule = /^(?:e|ea|eas|east)\b/i;
East.prototype.plain = "east";
East.prototype.direction = Direction.flag.EAST;

module.exports = East;
