// local includes
const Movement = require("./Movement");
const Direction = require("../../etc/Direction");

class Northwest extends Movement{
}

Northwest.prototype.rule = /^(?:northw|northwe|northwes|northwest|nw)\b/i;
Northwest.prototype.plain = "northwest|nw";
Northwest.prototype.direction = Direction.flag.NORTHWEST;

module.exports = Northwest;
