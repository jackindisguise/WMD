// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var Direction = require("../Direction");

class Movement extends Command{
	exec(mob){
		mob.step(this.direction);
	}
}

Movement.prototype.direction = null;

module.exports = Movement;
