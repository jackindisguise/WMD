// local includes
var _ = require("../../i18n");
var MUD = require("../../src/mud/core/MUD");
var Command = require("../../src/mud/Command");

class Quit extends Command.Command{
    exec(mob){
        if(mob.player) mob.player.quit();
    }
}

Quit.prototype.rule = /^(?:q|qu|qui|quit)$/;
Quit.prototype.plain = "quit";
Quit.prototype.specificity = Command.SPECIFICITY.FIRST;

module.exports = Quit;
