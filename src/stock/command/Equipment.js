// node includes
const util = require("util");

// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Equipment extends Command{
	exec(mob){
		let msg = _("You are wearing...");
		for(let slot of mob._slots){
			msg += "\r\n" + util.format("%s: %s", slot.name.padLeft(18), slot.worn ? slot.worn.display : "[nothing]");
		}

		mob.sendLine(msg);
	}
}

Equipment.prototype.rule = /^(?:e|eq|equ|equi|equip|equipm|equipme|equipmen|equipment)\b/i;
Equipment.prototype.plain = "equipment";
Equipment.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Equipment;
