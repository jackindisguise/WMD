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
		var result = mob.step(this.direction);
		if(!result) mob.sendLine("You can't go that way.");
		else mob.showRoom();
	}
}

Movement.prototype.direction = null;
Movement.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Movement;
