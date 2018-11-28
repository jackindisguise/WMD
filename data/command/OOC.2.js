// local includes
var MUD = require("../../src/core/MUD");
var Command = require("../../src/core/Command");
var _ = require("../../i18n");

class OOC extends Command.Command{
    exec(mob){
        mob.sendLine(_("What do you want to say?"));
    }
}

OOC.prototype.rule = /^(?:o|oo|ooc)/;
OOC.prototype.plain = "ooc";
OOC.prototype.specificity = Command.SPECIFICITY.LAST;

module.exports = OOC;
