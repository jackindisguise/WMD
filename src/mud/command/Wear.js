// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var WearSlot = require("../WearSlot");
var Equipment = require("../map/Equipment");

class Wear extends Command{
	exec(mob, keywords){
		var eq = mob.contents.search(keywords);
		if(!eq){
			mob.sendLine(_("You don't have anything like that."));
			return;
		}

		if(!(eq instanceof Equipment)){
			mob.sendLine(_("You can't wear that."));
			return;
		}

		if(eq.worn){
			mob.sendLine(_("You're already wearing that."));
			return;
		}

		var result = mob.equip(eq);
		if(!result) mob.sendLine(_("You can't wear that."));
		else {
			switch(result){
				case WearSlot.slot.HAND_PRIMARY:
				case WearSlot.slot.HAND_OFF:
					var slot = WearSlot.display[result];
					mob.sendLine(_("You put %s in your %s and wear it.", eq.display, slot));
					break;

				default:
					var slot = WearSlot.display[result];
					mob.sendLine(_("You put %s on your %s and wear it.", eq.display, slot));
					break;
			}
		}
	}
}

Wear.prototype.rule = /^(?:w|we|wea|wear|e|eq|equ|equi|equip) (.+)\b/i;
Wear.prototype.plain = "wear|equip";
Wear.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Wear;
