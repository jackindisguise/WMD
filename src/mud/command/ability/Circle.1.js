// local includes
const AbilityCommand = require("../../AbilityCommand");
const CommandSpecificity = require("../../CommandSpecificity");
const AbilityManager = require("../../manager/AbilityManager");
const circle = AbilityManager.getAbilityByName("circle");

class Circle extends AbilityCommand{
	exec(mob){
		if(!mob.fighting){
			mob.sendLine("You're not fighting anyone.");
			return;
		}

		circle.use(mob, mob.fighting);
	}
}

Circle.prototype.rule = /^(?:c|ci|cir|circ|circl|circle)$/i;
Circle.prototype.plain = "circle";
Circle.prototype.specificity = CommandSpecificity.FIRST;
Circle.prototype.ability = "circle";

module.exports = Circle;
