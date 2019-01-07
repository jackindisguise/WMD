// node includes
const util = require("util");

// local includes
const _ = require("../../../i18n");
const Command = require("../Command");
const CommandSpecificity = require("../CommandSpecificity");
const WearSlot = require("../WearSlot");

class Equipment extends Command{
	exec(mob){
		let msg = _("You are wearing...");
		for(let slot in mob.worn){
			let eq = mob.worn[slot];
			let name = WearSlot.display[slot]; 
			msg += "\r\n" + util.format("{G%s:{x %s", name.padLeft(18), eq ? eq.display : "[nothing]");
		}

		mob.sendLine(msg);
	}
}

Equipment.prototype.rule = /^(?:e|eq|equ|equi|equip|equipm|equipme|equipmen|equipment)\b/i;
Equipment.prototype.plain = "equipment";
Equipment.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Equipment;
