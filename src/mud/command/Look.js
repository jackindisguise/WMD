// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Look extends Command{
	exec(mob){
		mob.showRoom();
	}
}

Look.prototype.rule = /^(?:l|lo|loo|look)\b/i;
Look.prototype.plain = "look";
Look.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Look;
