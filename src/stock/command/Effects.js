// local includes
require("../../lib/String");
require("../../lib/Math");
const _ = require("../../../i18n");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const Command = require("../../mud/Command");

class Effects extends Command{
	exec(mob){
		if(mob.effects.length === 0){
			mob.sendLine(_("You aren't affected by anything."));
			return;
		}

		let msg = _("- Effects -").padRight(80, "-");
		for(let i=0;i<mob.effects.length;i++){
			let effect = mob.effects[i];
			let time = Math.msToTime((effect._startTime + effect.duration) - Date.now());
			let text = "";
			if(time.hour) text += String(time.hour).padLeft(2, "0") + ":";
			text += String(time.minute).padLeft(2, "0") + ":";
			text += String(time.second).padLeft(2, "0");
			msg += "\r\n" + _("You are affected by {W%s{x. (%s)", effect.name, text);
			let attributes = effect.getAttributes();
			for(let name in attributes){
				let value = attributes[name];
				if(value === 0) continue;
				msg += "\r\n    " + _("%s to {C%s{x.", (value < 0 ? "{R"+value+"{x" : "{G+"+value+"{x"), name);
			}
		}

		msg += "\r\n" + "-".repeat(80);
		mob.sendLine(msg);
	}
}

Effects.prototype.rule = /^(?:e|ef|eff|effe|effec|effect|effects)\b/i;
Effects.prototype.plain = "effects";
Effects.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Effects;
