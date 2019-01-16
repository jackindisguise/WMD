// local includes
const Movement = require("./Movement");
const Direction = require("../etc/Direction");

class Southeast extends Movement{
}

Southeast.prototype.rule = /^(?:southe|southea|southeas|southeast|se)\b/i;
Southeast.prototype.plain = "southeast|se";
Southeast.prototype.direction = Direction.flag.SOUTHEAST;

module.exports = Southeast;
