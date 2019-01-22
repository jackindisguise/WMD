// local includes
const Command = require("../../mud/Command");
const Armor = require("../effect/Armor");

class Test extends Command{
	exec(mob){
		let armor = new Armor({level:mob.level, duration:1000*60*3});
		armor.apply(mob);
	}
}

Test.prototype.rule = /^(?:a|ar|arm|armo|armor)\b/i;
Test.prototype.plain = "test";

module.exports = Test;
