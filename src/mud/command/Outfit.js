// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var TemplateManager = require("../manager/TemplateManager");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Outfitt extends Command{
	exec(mob){
		var outfit = [
			"Weapon.excalibur",
			"Armor.skullcap",
			"Armor.breastplate"
		];

		var msg = _("You pray for an outfit...");
		for(var name of outfit){
			var template = TemplateManager.getTemplateByName(name);
			if(!template) continue;
			var obj = template.spawn();
			obj.loc = mob;
			msg += "\r\n" + _("You got %s.", obj.display);
		}
		mob.sendLine(msg);
	}
}

Outfitt.prototype.rule = /^(?:o|ou|out|outf|outfi|outfit)\b/;
Outfitt.prototype.plain = "outfit";
Outfitt.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Outfitt;
