// local includes
var MUD = require("../../src/core/MUD");
var Command = require("../../src/core/Command");
var _ = require("../../i18n");

class OOC extends Command{
    exec(mob, input){
        for(var player of MUD.players){
            player.sendLine(_("%s OOC '%s'", mob.name, input));
        }
    }
}

OOC.prototype.rule = /o(?:o(?:c)?)? (.+)?/;
OOC.prototype.plain = "ooc";
OOC.prototype.specificity = 100;

module.exports = OOC;
