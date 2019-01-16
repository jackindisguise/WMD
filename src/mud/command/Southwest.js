// local includes
const Movement = require("./Movement");
const Direction = require("../etc/Direction");

class Southwest extends Movement{
}

Southwest.prototype.rule = /^(?:southw|southwe|southwes|southwest|sw)\b/i;
Southwest.prototype.plain = "southwest|sw";
Southwest.prototype.direction = Direction.flag.SOUTHWEST;

module.exports = Southwest;
