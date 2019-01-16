// local includes
require("../lib/Math");
const Command = require("../mud/Command");
const CommandSpecificity = require("../etc/CommandSpecificity");

class Look extends Command{
	exec(mob){
		mob.showRoom();
	}
}

Look.prototype.rule = /^(?:l|lo|loo|look)\b/i;
Look.prototype.plain = "look";
Look.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Look;
