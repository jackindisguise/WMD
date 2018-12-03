// local includes
var _ = require("../../../i18n");
var Database = require("../core/Database");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var channel = Database.getChannelByID(0);

class Whisper extends Command{
	exec(mob, message){
		mob.sendLine(_("What do you want to whisper to whom?"));
	}
}

Whisper.prototype.rule = /^(?:w|wh|whi|whis|whisp|whispe|whisper|t|te|tel|tell) (.+)\b/;
Whisper.prototype.plain = "whisper";
Whisper.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Whisper;
