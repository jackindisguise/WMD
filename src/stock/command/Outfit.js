// local includes
const _ = require("../../../i18n");
const TemplateManager = require("../../mud/manager/TemplateManager");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Outfitt extends Command{
	exec(mob){
		let outfit = [
			"Weapon.excalibur",
			"Shield.buckler",
			"Armor.skullcap",
			"Armor.breastplate"
		];

		let msg = _("You pray for an outfit...");
		for(let name of outfit){
			let template = TemplateManager.getTemplateByName(name);
			if(!template) continue;
			let obj = template.spawn();
			obj.loc = mob;
			obj.level = mob.level;
			msg += "\r\n" + _("You got %s.", obj.display);
		}
		mob.sendLine(msg);
	}
}

Outfitt.prototype.rule = /^(?:o|ou|out|outf|outfi|outfit)\b/i;
Outfitt.prototype.plain = "outfit";
Outfitt.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Outfitt;
