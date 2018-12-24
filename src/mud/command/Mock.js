// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var PlayerManager = require("../manager/PlayerManager");

class Mock extends Command{
	exec(mob, target){
		var victim = PlayerManager.getPlayerByName(target);
		if(!victim){
			mob.sendLine("There's nobody like that around.");
			return;
		}

		victim = victim.mob;
		var attackDamage = mob.attackPower;
		var attackDamageMitigation = victim.defense / 2;
		var damage = attackDamage - attackDamageMitigation;
		var hitChance = 1 - ((victim.evasion/2) / mob.speed);
		var msg = util.format("Your attack damage: %d", attackDamage);
		msg += "\r\n" + util.format("%s's defense: %d", victim.name, attackDamageMitigation);
		msg += "\r\n" + util.format("Your damage vs. %s: %d", victim.name, attackDamage - attackDamageMitigation);
		msg += "\r\n" + util.format("Your hit rating: %d", mob.speed);
		msg += "\r\n" + util.format("%s's evasion rating: %f", victim.name, victim.evasion/2);
		msg += "\r\n" + util.format("Your chance to hit %s: %f", victim.name, 1 - ((victim.evasion/2) / mob.speed));
		if(Math.probability(hitChance)) msg += "\r\n" + util.format("You mock hit %s for %d damage.", victim.name, damage);
		else msg += "\r\n" + util.format("You miss %s.", victim.name);
		mob.sendLine(msg);
	}
}

Mock.prototype.rule = /^(?:m|mo|moc|mock) (.+)/;
Mock.prototype.plain = "mock";
Mock.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Mock;
