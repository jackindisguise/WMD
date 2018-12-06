// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var TemplateManager = require("../manager/TemplateManager");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Pull extends Command{
	exec(mob){
		var template = TemplateManager.getTemplateByName("excalibur");
		var obj = template.spawn();
		obj.loc = mob;
		mob.sendLine(_("You pulled Excalibur from the fuckin' stone brah."));
	}
}

Pull.prototype.rule = /^(?:p|pu|pul|pull)\b/;
Pull.prototype.plain = "pull";
Pull.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Pull;
