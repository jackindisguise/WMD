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
	 * Get class by name.
	 * @param {string} name 
	 */
	static getClassByName(name){
		for(var _class of _classes){
			if(_class.name === name) return _class;
		}
	}
}

module.exports = ClassManager;
