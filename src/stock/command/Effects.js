// local includes
require("../../lib/String");
require("../../lib/Math");
const _ = require("../../../i18n");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const Command = require("../../mud/Command");

class Effects extends Command{
	exec(mob){
		if(mob._effects.length === 0){
			mob.sendLine(_("You aren't affected by anything."));
			return;
		}

		let msg = _("You're affected by...");
		for(let i=0;i<mob._effects.length;i++){
			let effect = mob._effects[i];

			// generate duration code
			let time = Math.msToTime((effect._startTime + effect.duration) - Date.now());
			let text = String(time.minute).padLeft(2, "0") + ":" + String(time.second).padLeft(2, "0");
			if(time.hour) text = String(time.hour).padLeft(2, "0") + ":" + text;

			// generate message
			msg += "\r\n" + _("  {W%s{x {y({Y%s{y){x", effect.name, text);
			let attributes = effect.getAttributes();
			for(let name in attributes){
				let value = attributes[name];
				if(value === 0) continue;
				msg += "\r\n  " + _("%s to {C%s{x.", (value < 0 ? "{R"+value+"{x" : "{G+"+value+"{x"), name);
			}
		}

		mob.sendLine(msg);
	}
}

Effects.prototype.rule = /^(?:e|ef|eff|effe|effec|effect|effects)\b/i;
Effects.prototype.plain = "effects";
Effects.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Effects;
