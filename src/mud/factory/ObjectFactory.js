var TemplateManager = require("../manager/TemplateManager");
var MapObject = require("../map/MapObject");
var Movable = require("../map/Movable");
var Mob = require("../map/Mob");
var Item = require("../map/Item");
var Equipment = require("../map/Equipment");
var Weapon = require("../map/Weapon");
var Tile = require("../map/Tile");

var _constructorNames = {
	"MapObject": MapObject,
	"Movable": Movable,
	"Mob": Mob,
	"Item": Item,
	"Equipment": Equipment,
	"Weapon": Weapon,
	"Tile": Tile
}

class ObjectFactory{
	static getConstructorByName(name){
		return _constructorNames[name];
	}

	static loadFromJSON(json){
		if(json.template){
			return ObjectFactory.loadFromJSONAsTemplate(json);
		} if(json.constructor){
			return ObjectFactory.loadFromJSONAsConstructor(json);
		}
	}

	static loadFromJSONAsConstructor(json){
		var constructor = ObjectFactory.getConstructorByName(json.constructor);
		if(!constructor) return;
		var obj = new constructor();
		obj.__fromJSON(json);
		return obj;
	}

	static loadFromJSONAsTemplate(json){
		var templateName = json.template;
		var template = TemplateManager.getTemplateByName(templateName);
		var constructor = ObjectFactory.getConstructorByName(template.obj.constructor.name);
		if(!constructor) return;
		var obj = new constructor();
		obj.__fromJSON(json);
		return obj;
	}
}

module.exports = ObjectFactory;
