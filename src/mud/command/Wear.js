// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var WearLocation = require("../WearLocation");

class Wear extends Command{
	exec(mob, keywords){
		var obj = mob.contents.search(keywords);
		if(!obj){
			mob.sendLine(_("You don't have anything like that."));
			return;
		}

		if(obj.worn){
			mob.sendLine(_("You're already wearing that."));
			return;
		}

		var result = mob.wear(obj);
		if(!result) mob.sendLine(_("You can't wear that."));
		else {
			switch(result){
				case WearLocation.slots.HAND_PRIMARY:
				case WearLocation.slots.HAND_OFF:
					var slot = WearLocation.slotNames[result];
					mob.sendLine(_("You put %s in your %s and wear it.", obj.display, slot));
					break;

				default:
					var slot = WearLocation.slotNames[result];
					mob.sendLine(_("You put %s on your %s and wear it.", obj.display, slot));
					break;
			}
		}
	}
}

Wear.prototype.rule = /^(?:w|we|wea|wear) (.+)\b/;
Wear.prototype.plain = "wear";
Wear.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Wear;
