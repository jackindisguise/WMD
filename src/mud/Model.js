// local includes
var MapObjectFactory = require("./factory/MapObjectFactory");

class Model{
	constructor(options){
		if(options){
			if(options.name) this.name = options.name;
		}
	}

	__JSONRead(key, value){
		switch(key){
			// object instance with attributes assigned.
			case "obj":
				this.obj = MapObjectFactory.loadFromJSON(value);
				break;

			default:
				super.__JSONRead(key, value); break;
		}
	}

	__JSONWrite(key, value, json){
		switch(key){
			case "obj": json.obj = value.__toJSON(); break; // save JSON object
			default: super.__JSONWrite(key, value, json); break;
		}
	}

	/**
	 * Spawn an instance of this template.
	 */
	spawn(){
		var obj = this.obj.__createClone();
		obj.model = this;
		return obj;
	}
}


Model.prototype.name = null;
Model.prototype.obj = null;

module.exports = Model;
