// local includes
var ObjectFactory = require("./factory/ObjectFactory");

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
		var obj = this.obj.clone();
		obj.template = this;
		return obj;
	}
}


Template.prototype.name = null;
Template.prototype.type = null;
Template.prototype.obj = null;

module.exports = Template;
