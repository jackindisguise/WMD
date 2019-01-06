// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Whisper extends Command{
	exec(mob, message){
		mob.sendLine(_("What do you want to whisper to whom?"));
	}
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper|t|te|tel|tell) (.+)\b/i;
Whisper.prototype.plain = "whisper|tell";
Whisper.prototype.specificity = CommandSpecificity.LAST;
Whisper.prototype.error = true;

module.exports = Whisper;
