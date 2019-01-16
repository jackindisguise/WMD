// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const WearSlot = require("../../etc/WearSlot");
const Equipment = require("../../mud/map/Equipment");

class Wear extends Command{
	exec(mob, keywords){
		let eq = mob.contents.search(keywords);
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

		let result = mob.equip(eq);
		let slot;
		if(!result) mob.sendLine(_("You can't wear that."));
		else {
			switch(result){
			case WearSlot.slot.HAND_PRIMARY:
			case WearSlot.slot.HAND_OFF:
				slot = WearSlot.display[result];
				mob.sendLine(_("You put %s in your %s and wear it.", eq.display, slot));
				break;

			default:
				slot = WearSlot.display[result];
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
