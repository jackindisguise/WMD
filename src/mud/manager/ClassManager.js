require("../../lib/Array");

let classes = [];

class ClassManager{
	static get classes(){
		return classes;
	}

	static add(_class){
		if(classes.indexOf(_class) !== -1) return;
		classes.push(_class);
	}

	static remove(_class){
		let pos = classes.indexOf(_class);
		if(pos === -1) return;
		classes.splice(pos, 1);
	}

	/**
	 * Get class by name.
	 * @param {string} name 
	 */
	static getClassByName(name){
		for(let _class of classes){
			if(_class.name === name) return _class;
		}
	}
}

module.exports = ClassManager;
