// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class OOC extends Command{
	exec(mob){
		mob.sendLine(_("What do you want to say?"));
	}
}

OOC.prototype.rule = /^(?:o|oo|ooc)\b/i;
OOC.prototype.plain = "ooc";
OOC.prototype.specificity = CommandSpecificity.LAST;
OOC.prototype.error = true;

module.exports = OOC;
