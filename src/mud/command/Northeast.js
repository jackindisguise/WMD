// node includes
var util = require("util");

// local includes
var Movement = require("./Movement");
var Direction = require("../Direction");

class Northeast extends Movement{
}

Northeast.prototype.rule = /^(?:northe|northea|northeas|northeast|ne)\b/i;
Northeast.prototype.plain = "northeast|ne";
Northeast.prototype.direction = Direction.flag.NORTHEAST;

module.exports = Northeast;
