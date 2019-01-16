// local includes
const Command = require("../mud/Command");
const CommandSpecificity = require("../etc/CommandSpecificity");

class Level extends Command{
	exec(mob){
		mob.levelup();
	}
}

Level.prototype.rule = /^(?:l|le|lev|leve|level)\b/i;
Level.prototype.plain = "level";
Level.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Level;
