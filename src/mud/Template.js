// local includes
const ObjectFactory = require("./factory/MapObjectFactory");

class Template{
	constructor(options){
		if(options){
			if(options.name) this.name = options.name;
		}
	}

	__JSONRead(key, value){
		switch(key){
		// object instance with attributes assigned.
		case "obj":
			this.obj = ObjectFactory.loadFromJSON(value);
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
		let obj = this.obj.__createClone();
		obj.template = this;
		return obj;
	}
}


Template.prototype.name = null;
Template.prototype.obj = null;

module.exports = Template;
