require("../../lib/Array");

var _classes = [];

class ClassManager{
	static get classes(){
		return _classes;
	}

	static add(_class){
		if(_classes.indexOf(_class) != -1) return;
		_classes.push(_class);
	}

	static remove(_class){
		var pos = _classes.indexOf(_class);
		if(pos == -1) return;
		_classes.splice(pos, 1);
	}

	/**
	 * Get class by ID;
	 * @param {number} id 
	 */
	static getClassByID(id){
		for(var _class of _classes){
			if(_class.id === id) return _class;
		}
	}

	/**
	 * Get class by display name.
	 * @param {string} name 
	 */
	static getClassByName(name){
		for(var _class of _classes){
			if(_class.display === name) return _class;
		}
	}
}

module.exports = ClassManager;
