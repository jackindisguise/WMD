// node includes
var util = require("util");

// local includes
var Movement = require("./Movement");
var Direction = require("../Direction");

class Southwest extends Movement{
}

Southwest.prototype.rule = /^(?:southw|southwe|southwes|southwest|sw)\b/;
Southwest.prototype.plain = "southwest|sw";
Southwest.prototype.direction = Direction.flag.SOUTHWEST;

module.exports = Southwest;
