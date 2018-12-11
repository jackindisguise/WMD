// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Movement = require("./Movement");
var CommandSpecificity = require("../CommandSpecificity");
var Direction = require("../Direction");

class South extends Movement{
}

South.prototype.rule = /^(?:s|so|sou|sout|south)\b/;
South.prototype.plain = "south";
South.prototype.direction = Direction.flag.SOUTH;

module.exports = South;
