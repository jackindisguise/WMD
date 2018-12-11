var TemplateManager = require("../manager/TemplateManager");
var ModelManager = require("../manager/ModelManager");
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

class MapObjectFactory{
	static getConstructorByName(name){
		return _constructorNames[name];
	}

	static loadFromJSON(json){
		if(json.model) return MapObjectFactory.loadFromJSONAsModel(json);
		if(json.template) return MapObjectFactory.loadFromJSONAsTemplate(json);
		if(json.constructor) return MapObjectFactory.loadFromJSONAsConstructor(json);
	}

	static loadFromJSONAsConstructor(json){
		var constructor = MapObjectFactory.getConstructorByName(json.constructor);
		if(!constructor) return;
		return MapObjectFactory.construct(constructor, json);
	}

	static loadFromJSONAsTemplate(json){
		var templateName = json.template;
		var template = TemplateManager.getTemplateByName(templateName);
		var obj = template.spawn();
		obj.__fromJSON(json);
		return obj;
	}

	static loadFromJSONAsModel(json){
		var modelName = json.model;
		var model = ModelManager.getModelByName(modelName);
		var obj = model.spawn();
		obj.__fromJSON(json);
		return obj;
	}

	static construct(constructor, json){
		var obj = new constructor();
		obj.__fromJSON(json);

		// load contents
		if(json.contents){
			for(var _json of json.contents){
				var _obj = MapObjectFactory.loadFromJSON(_json);
				if(_obj) _obj.loc = obj;
			}
		}

		return obj;
	}
}

module.exports = MapObjectFactory;
