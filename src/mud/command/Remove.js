// local includes
require("../../lib/Math");
const _ = require("../../../i18n");
const Command = require("../Command");
const CommandSpecificity = require("../etc/CommandSpecificity");
const WearSlot = require("../etc/WearSlot");

class Remove extends Command{
	exec(mob, keywords){
		let worn = [];
		let slot;
		for(slot in mob.worn) if(mob.worn[slot]) worn.push(mob.worn[slot]);
		let obj = worn.search(keywords);
		if(!obj){
			mob.sendLine(_("You aren't wearing anything like that."));
			return;
		}

		let result = mob.unequip(obj);
		if(!result) mob.sendLine(_("You can't take that off."));
		else {
			switch(result){
			case WearSlot.slot.HAND_PRIMARY:
			case WearSlot.slot.HAND_OFF:
				slot = WearSlot.display[result];
				mob.sendLine(_("You take %s out of your %s and remove it.", obj.display, slot));
				break;

			default:
				slot = WearSlot.display[result];
				mob.sendLine(_("You take %s off of your %s and remove it.", obj.display, slot));
				break;
			}
		}
	}
}

Remove.prototype.rule = /^(?:r|re|rem|remo|remov|remove|u|un|une|uneq|unequ|unequi|unequip) (.+)\b/i;
Remove.prototype.plain = "remove|unequip";
Remove.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Remove;
