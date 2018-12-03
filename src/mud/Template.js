// local includes
var MapObject = require("./map/MapObject");
var Movable = require("./map/Movable");
var Mob = require("./map/Mob");
var Item = require("./map/Item");
var Equipment = require("./map/Equipment");
var Tile = require("./map/Tile");

class Template{
	__JSONRead(key, value){
		switch(key){
			// get the literal constructor based on the name
			case "type":
				var v = MapObject;
				switch(value){
					case "Tile": v = Tile; break;
					case "Equipment": v = Equipment; break;
					case "Item": v = Item; break;
					case "Mob": v = Mob; break;
					case "Movable": v = Movable; break;
					case "MapObject": v = MapObject; break;
				}

				this.type = v;
				break;

			// object instance with attributes assigned.
			case "obj":
				var _constructor = this.type;
				var obj = new _constructor();
				obj.__fromJSON(value);
				this.obj = obj;
				break;

			default: Object.call(this, key, value, json); break;
		}
	}

	__JSONWrite(key, value, json){
		switch(key){
			case "type": json.type = value.name; break; // save constructor name as type
			case "obj": json.obj = value.__toJSON(); break; // save JSON object
			default: Object.call(this, key, value, json); break;
		}
	}

	/**
	 * Spawn an instance of this template.
	 */
	spawn(){
		var _constructor = this.type;
		var instance = new _constructor();
		instance.__proto__ = this.obj;
		return instance;
	}
}

Template.prototype.type = MapObject;

Template.prototype.obj = null;

module.exports = Template;
