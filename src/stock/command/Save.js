// local includes
const CharacterManager = require("../../mud/manager/CharacterManager");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Save extends Command{
	exec(mob){
		CharacterManager.saveCharacterAsMob(mob);
		mob.sendLine("You're saved. :)");
	}
}

Save.prototype.rule = /^(?:s|sa|sav|save)\b/i;
Save.prototype.plain = "save";
Save.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Save;
