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

}

module.exports = CharacterManager;
