const Command = require("./Command");

class AbilityCommand extends Command{
	match(mob, input){
		if(!mob.hasAbilityByName(this.ability.name)) return false; // doesn't have this ability
		return super.match(mob, input);
	}
}

AbilityCommand.prototype.ability = null;

module.exports = AbilityCommand;
