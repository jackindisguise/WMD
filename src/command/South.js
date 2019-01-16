// local includes
const Movement = require("./Movement");
const Direction = require("../etc/Direction");

class South extends Movement{
}

South.prototype.rule = /^(?:s|so|sou|sout|south)\b/i;
South.prototype.plain = "south";
South.prototype.direction = Direction.flag.SOUTH;

module.exports = South;
