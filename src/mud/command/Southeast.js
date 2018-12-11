// node includes
var util = require("util");

// local includes
var Movement = require("./Movement");
var Direction = require("../Direction");

class Southeast extends Movement{
}

Southeast.prototype.rule = /^(?:southe|southea|southeas|southeast|se)\b/;
Southeast.prototype.plain = "southeast|se";
Southeast.prototype.direction = Direction.flag.SOUTHEAST;

module.exports = Southeast;
