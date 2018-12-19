// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var TemplateManager = require("../manager/TemplateManager");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Create extends Command{
	exec(mob){
		var template = TemplateManager.getTemplateByName("Weapon.excalibur");
		var obj = template.spawn();
		obj.loc = mob;
		mob.sendLine(_("You created a sword out of nothing. Cool."));
	}
}

Create.prototype.rule = /^(?:c|cr|cre|crea|creat|create)\b/;
Create.prototype.plain = "create";
Create.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Create;
