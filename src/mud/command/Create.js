// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Database = require("../core/Database");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var Item = require("../map/Item");

class Create extends Command{
	exec(mob){
		var template = Database.getTemplateByID(0);
		var obj = template.spawn();
		obj.loc = mob;
		mob.sendLine(_("You created a rock out of nothing. Very cool."));
	}
}

Create.prototype.rule = /^(?:c|cr|cre|crea|creat|create)\b/;
Create.prototype.plain = "create";
Create.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Create;
