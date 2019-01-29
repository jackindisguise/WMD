// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");
const CharacterManager = require("../../mud/manager/CharacterManager");

class Engage extends Command{
	exec(mob, password){
		let character = CharacterManager.getCharacterByName(mob.name);
		if(!character) return; // nonexistent character
		if(character.password !== password) return; // bad password
		CharacterManager.deleteCharacterAsMob(mob); // delete character including its file
		mob.sendLine(_("You turn into a lion noise.")); // turn into a lion noise
		mob.player.quit();
	}
}

Engage.prototype.rule = /^(?:delete) (.+)/i;
Engage.prototype.plain = "delete";
Engage.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Engage;
