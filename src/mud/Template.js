// local includes
var MapObjectFactory = require("./factory/MapObjectFactory");

class Template{
	constructor(options){
		if(options){
			if(options.name) this.name = options.name;
		}
	}

	__JSONRead(key, value){
		switch(key){
			// get the literal constructor based on the name
			case "type":
				var constructor = MapObjectFactory.getConstructorByType(value);
				if(!constructor) Logger.error(_("bad constructor %s", value));
				else this.type = constructor;
				break;

			// object instance with attributes assigned.
			case "obj":
				this.obj = MapObjectFactory.loadFromBaseJSON(value, this.type);
				break;

			default:
				Object.__JSONRead.call(this, key, value); break;
		}
	}

	__JSONWrite(key, value, json){
		switch(key){
			case "type": json.type = value.name; break; // save constructor name as type
			case "obj": json.obj = value.__toJSON(); break; // save JSON object
			default: Object.__JSONWrite.call(this, key, value, json); break;
		}
	}

	/**
	 * Spawn an instance of this template.
	 */
	spawn(){
		var constructor = this.type;
		var instance = new constructor({template:this});
		return instance;
	}
}


Template.prototype.name = null;
Template.prototype.type = null;
Template.prototype.obj = null;

module.exports = Template;
