// local includes
const _ = require("../../../i18n");
const Command = require("../Command");
const CommandSpecificity = require("../CommandSpecificity");

class Test extends Command{
	exec(mob){
		let txt = JSON.stringify(mob.__toJSON(), null, "\t");
		txt = txt.replace("{", "{{");
		mob.sendLine(txt);
	}
}

Test.prototype.rule = /^(?:t|te|tes|test)\b/i;
Test.prototype.plain = "test";
Test.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Test;
