// local includes
const Command = require("../Command");
const CommandSpecificity = require("../etc/CommandSpecificity");

class Quit extends Command{
	exec(mob){
		if(mob.player) mob.player.quit();
	}
}

Quit.prototype.rule = /^(?:q|qu|qui|quit)\b/i;
Quit.prototype.plain = "quit";
Quit.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Quit;
