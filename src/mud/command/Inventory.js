// node includes
const util = require("util");

// local includes
require("../../lib/Math");
const _ = require("../../../i18n");
const Command = require("../Command");
const CommandSpecificity = require("../CommandSpecificity");

class Inventory extends Command{
	exec(mob){
		var msg = _("You are carrying:");
		if(mob.contents.length){
			for(var obj of mob.contents){
				msg += "\r\n" + util.format("%s %s", (obj.worn ? _("{Y(worn){x") : "      "), obj.name);
			}
		} else {
			msg += "\r\n" + "    nothing";
		}

		mob.sendLine(msg);
	}
}

Inventory.prototype.rule = /^(?:i|in|inv|inve|inven|invent|invento|inventor|inventory)\b/i;
Inventory.prototype.plain = "inventory";
Inventory.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Inventory;
