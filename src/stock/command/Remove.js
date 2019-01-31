// local includes
require("../../lib/Math");
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Remove extends Command{
	exec(mob, keywords){
		let obj = mob.worn.search(keywords);
		if(!obj){
			mob.sendLine(_("You aren't wearing anything like that."));
			return;
		}

		let slot = obj.worn;
		let result = mob.unequip(obj);
		if(!result) mob.sendLine(_("You can't take that off."));
		else mob.sendLine(_("You take %s off of your %s and remove it.", obj.display, slot.name));
	}
}

Remove.prototype.rule = /^(?:r|re|rem|remo|remov|remove|u|un|une|uneq|unequ|unequi|unequip) (.+)\b/i;
Remove.prototype.plain = "remove|unequip";
Remove.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Remove;
