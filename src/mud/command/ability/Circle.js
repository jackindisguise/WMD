// local includes
const AbilityCommand = require("../../AbilityCommand");
const CommandSpecificity = require("../../CommandSpecificity");
const AbilityManager = require("../../manager/AbilityManager");
const circle = AbilityManager.getAbilityByName("circle");

class Circle extends AbilityCommand{
	exec(mob, target){
		let victim = mob.loc.contents.search(target);
		if(victim){
			circle.use(mob, victim);
			return;
		}

		mob.sendMessage("Who do you wanna circle?");
	}
}

Circle.prototype.rule = /^(?:c|ci|cir|circ|circl|circle) (.+)/i;
Circle.prototype.plain = "circle";
Circle.prototype.specificity = CommandSpecificity.FIRST;
Circle.prototype.ability = "circle";
Circle.prototype.ready = true;

module.exports = Circle;
