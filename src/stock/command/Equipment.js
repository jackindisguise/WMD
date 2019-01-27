// node includes
const util = require("util");

// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const WearSlot = require("../../etc/WearSlot");

class Equipment extends Command{
	exec(mob){
		let msg = _("You are wearing...");
		for(let slot in mob._worn){
			let eq = mob._worn[slot];
			let name = WearSlot.display[slot]; 
			msg += "\r\n" + util.format("%s: %s", name.padLeft(18), eq ? eq.display : "[nothing]");
		}

		mob.sendLine(msg);
	}
}

Equipment.prototype.rule = /^(?:e|eq|equ|equi|equip|equipm|equipme|equipmen|equipment)\b/i;
Equipment.prototype.plain = "equipment";
Equipment.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Equipment;
