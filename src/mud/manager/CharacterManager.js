const Character = require("../Character");

let characters = [];

class CharacterManager{
	static get characters(){
		return characters;
	}

	static add(character){
		if(characters.indexOf(character) !== -1) return;
		characters.push(character);
	}

	static remove(character){
		let pos = characters.indexOf(character);
		if(pos === -1) return;
		characters.splice(pos, 1);
	}

	static getCharacterByName(name){
		for(let character of characters){
			if(character.name === name) return character;
		}
	}

	static createCharacter(mob, password){
		let character = CharacterManager.getCharacterByName(mob.name);
		if(character) return false;
		character = new Character({name: mob.name, mob: mob, password: password});
		CharacterManager.add(character);
		return character;
	}

	static saveCharacterAsMob(mob){
		let character = CharacterManager.getCharacterByName(mob.name);
		if(!character) return false;
		character.mob = mob; // update character
		return character;
	}

	static deleteCharacterAsMob(mob){
		return CharacterManager.deleteCharacterByName(mob.name);
	}

	static deleteCharacterByName(name){
		let character = CharacterManager.getCharacterByName(name);
		if(!character) return false;
		character.deleteFile();
		this.remove(character);
		return character;
	}
}

module.exports = CharacterManager;
