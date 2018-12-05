// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Whisper extends Command{
	exec(mob){
		mob.sendLine(_("What do you want to whisper to whom?"));
	}
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper|t|te|tel|tell)\b/;
Whisper.prototype.plain = "whisper";
Whisper.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Whisper;
