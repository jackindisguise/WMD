// local includes
const _ = require("../../../../i18n");
const AbilityCommand = require("../../../mud/AbilityCommand");
const CommandSpecificity = require("../../../etc/CommandSpecificity");
const AbilityManager = require("../../../mud/manager/AbilityManager");
const circle = AbilityManager.getAbilityByName("circle");

class Circle extends AbilityCommand{
	exec(mob){
		if(!mob.fighting){
			mob.sendLine(_("You're not fighting anyone."));
			return;
		}

		circle.use(mob, mob.fighting);
	}
}

Circle.prototype.rule = /^(?:c|ci|cir|circ|circl|circle)$/i;
Circle.prototype.plain = "circle";
Circle.prototype.specificity = CommandSpecificity.FIRST;
Circle.prototype.ability = circle;
Circle.prototype.ready = true;

module.exports = Circle;
