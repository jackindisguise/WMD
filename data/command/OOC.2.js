// local includes
var _ = require("../../i18n");
var Command = require("../../src/core/Command");

class OOC extends Command.Command{
    exec(mob){
        mob.sendLine(_("What do you want to say?"));
    }
}

OOC.prototype.rule = /^(?:o|oo|ooc)/;
OOC.prototype.plain = "ooc";
OOC.prototype.specificity = Command.SPECIFICITY.LAST;

module.exports = OOC;
