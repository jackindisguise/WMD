// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Remove extends Command{
	exec(mob, keywords){
		var worn = [];
		for(var slot in mob.wearLocation) if(mob.wearLocation[slot]) worn.push(mob.wearLocation[slot]);
		var obj = worn.search(keywords);
		if(!obj){
			mob.sendLine(_("You aren't wearing anything like that."));
			return;
		}

		var result = mob.remove(obj);
		if(result) mob.sendLine(_("You stop wearing %s.", obj.display));
		else mob.sendLine(_("You can't remove that."));
	}
}

Remove.prototype.rule = /^(?:r|re|rem|remo|remov|remove) (.+)\b/;
Remove.prototype.plain = "remove";
Remove.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Remove;
