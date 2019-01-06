// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Quit extends Command{
	exec(mob){
		if(mob.player) mob.player.quit();
	}
}

Quit.prototype.rule = /^(?:q|qu|qui|quit)\b/i;
Quit.prototype.plain = "quit";
Quit.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Quit;
