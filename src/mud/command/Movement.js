// local includes
require("../../lib/Math");
const Command = require("../Command");
const CommandSpecificity = require("../CommandSpecificity");

class Movement extends Command{
	exec(mob){
		if(mob.fighting){
			mob.sendLine("You're a little busy right now.");
			return;
		}

		let result = mob.step(this.direction);
		if(!result) mob.sendLine("You can't go that way.");
		else mob.showRoom();
	}
}

Movement.prototype.direction = null;
Movement.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Movement;
