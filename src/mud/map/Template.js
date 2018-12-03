// local includes
var MapObject = require("./MapObject");
var Movable = require("./Movable");
var Mob = require("./Mob");
var Item = require("./Item");
var Equipment = require("./Equipment");
var Tile = require("./Tile");

class Template{
	__JSONRead(key, value){
		switch(key){
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
			case "type": json.type = value.name; break;
			case "obj": json.obj = value.__toJSON(); break;
			default: Object.call(this, key, value, json); break;
		}
	}
}

Template.prototype.type = MapObject;

Template.prototype.obj = null;
