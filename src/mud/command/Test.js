var util = require("util");

// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var TemplateManager = require("../manager/TemplateManager");
var belt = TemplateManager.getTemplateByName("belt");

class Test extends Command{
	exec(mob){
		var b = belt.spawn();
		b.loc = mob;
		mob.sendLine(_("You got a belt with something inside it."));
		for(var obj of b.contents){
			mob.sendLine(util.format("    %s (%d)", obj.name, obj.id));
		}
	}
}

Test.prototype.rule = /^(?:t|te|tes|test)\b/;
Test.prototype.plain = "test";
Test.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Test;
