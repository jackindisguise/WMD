var util = require("util");

// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Test extends Command{
	exec(mob){
		var txt = JSON.stringify(mob.__toJSON(), null, "\t");
		txt = txt.replace("{", "{{");
		mob.sendLine(txt);
	}
}

Test.prototype.rule = /^(?:t|te|tes|test)\b/i;
Test.prototype.plain = "test";
Test.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Test;
