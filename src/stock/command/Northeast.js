// local includes
const Movement = require("./Movement");
const Direction = require("../../etc/Direction");

class Northeast extends Movement{
}

Northeast.prototype.rule = /^(?:northe|northea|northeas|northeast|ne)\b/i;
Northeast.prototype.plain = "northeast|ne";
Northeast.prototype.direction = Direction.flag.NORTHEAST;

module.exports = Northeast;
