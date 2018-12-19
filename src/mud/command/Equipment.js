// node includes
var util = require("util");

// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var WearLocation = require("../WearLocation");

class Equipment extends Command{
	exec(mob){
		var msg = _("You are wearing...");
		for(var slot in mob.wearLocation){
			var eq = mob.wearLocation[slot];
			var name = WearLocation.slotNames[slot]; 
			msg += "\r\n" + util.format("{G%s:{x %s", name.padLeft(18), eq ? eq.display : "nothing");
		}

		mob.sendLine(msg);
	}
}

Equipment.prototype.rule = /^(?:e|eq|equ|equi|equip|equipm|equipme|equipmen|equipment)\b/;
Equipment.prototype.plain = "equipment";
Equipment.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Equipment;
