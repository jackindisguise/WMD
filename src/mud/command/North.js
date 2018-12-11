// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Movement = require("./Movement");
var CommandSpecificity = require("../CommandSpecificity");
var Direction = require("../Direction");

class North extends Movement{
}

North.prototype.rule = /^(?:n|no|nor|nort|north)\b/;
North.prototype.plain = "north";
North.prototype.direction = Direction.flag.NORTH;

module.exports = North;
