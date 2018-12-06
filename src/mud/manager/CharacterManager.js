var _characters = [];

class CharacterManager{
	static get characters(){
		return _characters;
	}

	static add(character){
		if(_characters.indexOf(character) != -1) return;
		_characters.push(character);
	}

	static remove(character){
		var pos = _characters.indexOf(character);
		if(pos == -1) return;
		_characters.splice(pos, 1);
	}

}

module.exports = CharacterManager;
