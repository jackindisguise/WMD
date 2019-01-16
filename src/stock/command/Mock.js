// node includes
const util = require("util");

// local includes
require("../../lib/Math");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Mock extends Command{
	exec(mob, target){
		let victim = mob.loc.contents.search(target);
		if(!victim){
			mob.sendLine("There's nobody like that around.");
			return;
		}

		let attackDamage = mob.attackPower;
		let rawDamage = attackDamage;
		let precision = mob.precision - victim.deflection; // precision value
		let precisionModifier = 1 + (precision / 25); // 25 points of precision gives 100% bonus damage.
		let damagePhaseOne = rawDamage * precisionModifier;
		let damagePhaseTwo = damagePhaseOne - (victim.defense / 2);
		let msg = util.format("Mock hit vs. %s:", victim.name);
		msg += "\r\n" + util.format("> Your initial damage: %d (%d attack power)", rawDamage, attackDamage);
		msg += "\r\n" + util.format("> Your damage penetration: %f%% (%d precision vs. %d deflection)", precisionModifier*100, mob.precision, victim.deflection);
		msg += "\r\n" + util.format("> %s's damage mitigation: %d (%d defense)", victim.name, victim.defense/2, victim.defense);
		msg += "\r\n" + util.format("You mock hit %s for %d damage.", victim.name, damagePhaseTwo);
		mob.sendLine(msg);
	}
}

Mock.prototype.rule = /^(?:m|mo|moc|mock) (.+)/i;
Mock.prototype.plain = "mock";
Mock.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Mock;
