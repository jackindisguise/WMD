// local includes
const _ = require("../../../i18n");
const TemplateManager = require("../../mud/manager/TemplateManager");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const MapObjectFactory = require("../../mud/factory/MapObjectFactory");

class Save extends Command{
	exec(mob){
		let json = mob.__toJSON();
		console.log(json);
		let copy = MapObjectFactory.loadFromJSON(json);
		console.log(copy);
	}
}

Save.prototype.rule = /^(?:s|sa|sav|save)\b/i;
Save.prototype.plain = "save";
Save.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Save;
