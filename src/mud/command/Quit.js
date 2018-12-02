// local includes
var _ = require("../../../i18n");
var MUD = require("../core/MUD");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Quit extends Command{
    exec(mob){
        if(mob.player) mob.player.quit();
    }
}

Quit.prototype.rule = /^(?:q|qu|qui|quit)$/;
Quit.prototype.plain = "quit";
Quit.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Quit;
