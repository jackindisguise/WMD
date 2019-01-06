// node includes
var util = require("util");

// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var WearSlot = require("../WearSlot");

class Equipment extends Command{
	exec(mob){
		var msg = _("You are wearing...");
		for(var slot in mob.worn){
			var eq = mob.worn[slot];
			var name = WearSlot.display[slot]; 
			msg += "\r\n" + util.format("{G%s:{x %s", name.padLeft(18), eq ? eq.display : "[nothing]");
		}

		mob.sendLine(msg);
	}
}

Equipment.prototype.rule = /^(?:e|eq|equ|equi|equip|equipm|equipme|equipmen|equipment)\b/i;
Equipment.prototype.plain = "equipment";
Equipment.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Equipment;
