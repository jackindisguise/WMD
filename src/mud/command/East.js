// node includes
var util = require("util");

// local includes
var Movement = require("./Movement");
var Direction = require("../Direction");

class East extends Movement{
}

East.prototype.rule = /^(?:e|ea|eas|east)\b/;
East.prototype.plain = "east";
East.prototype.direction = Direction.flag.EAST;

module.exports = East;
