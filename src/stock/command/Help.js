// node inclues
const util = require("util");

// local includes
require("../../lib/String");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const HelpfileManager = require("../../mud/manager/HelpfileManager");

class OOC extends Command{
	exec(mob, keywords){
		let helpfile = HelpfileManager.getHelpfileByKeywords(keywords);
		if(!helpfile) {
			mob.sendLine("Nobody knows what that is.");
			return;
		}

		let msg = "{c" + util.format("~ {C%s {c~", helpfile.keywords).center(80, "~") + "{x";
		msg += "\r\n" + helpfile.content;
		msg += "{c" + "~".repeat(80) + "{x";
		mob.sendLine(msg);
	}
}

OOC.prototype.rule = /^(?:h|he|hel|help) (.+)\b/i;
OOC.prototype.plain = "ooc";
OOC.prototype.specificity = CommandSpecificity.FIRST;

module.exports = OOC;
