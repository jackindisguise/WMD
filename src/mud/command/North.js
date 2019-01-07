// local includes
require("../../lib/Math");
const Movement = require("./Movement");
const Direction = require("../Direction");

class North extends Movement{
}

North.prototype.rule = /^(?:n|no|nor|nort|north)\b/i;
North.prototype.plain = "north";
North.prototype.direction = Direction.flag.NORTH;

module.exports = North;
