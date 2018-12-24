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
		var hitChance = 1 - ((victim.evasion*0.10) / mob.speed);
		var msg = util.format("Your damage vs. %s: %d (%d attack power vs. %d defense)", victim.name, damage, mob.attackPower, victim.defense);
		msg += "\r\n" + util.format("Your hit chance vs. %s: %f%% (%d speed vs. %d evasion)", victim.name, hitChance*100, mob.speed, victim.evasion);
		msg += "\r\n"+ util.format("Your HP: %d vs. %s's HP: %d", mob.maxHealth, victim.name, victim.maxHealth);
		if(Math.probability(hitChance)) msg += "\r\n" + util.format("You mock hit %s for %d damage.", victim.name, damage);
		else msg += "\r\n" + util.format("You miss %s.", victim.name);
		mob.sendLine(msg);
	}
}

Mock.prototype.rule = /^(?:m|mo|moc|mock) (.+)/;
Mock.prototype.plain = "mock";
Mock.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Mock;
