// node includes
var util = require("util");

// local includes
var Logger = require("../../util/Logger");
var TemplateManager = require("../manager/TemplateManager");
var ModelManager = require("../manager/ModelManager");
var MapObject = require("../map/MapObject");
var Movable = require("../map/Movable");
var Mob = require("../map/Mob");
var Item = require("../map/Item");
var Equipment = require("../map/Equipment");
var Weapon = require("../map/Weapon");
var Armor = require("../map/Armor");
var Shield = require("../map/Shield");
var Tile = require("../map/Tile");

// constructor name table
var constructorNames = {
	"MapObject": MapObject,
	"Movable": Movable,
	"Mob": Mob,
	"Item": Item,
	"Equipment": Equipment,
	"Armor": Armor,
	"Shield": Shield,
	"Weapon": Weapon,
	"Tile": Tile
}

/**
 * Handles creation of MapObjects from JSON.
 */
class MapObjectFactory{
	static getConstructorByName(name){
		return constructorNames[name];
	}

	static loadFromJSON(json){
		if(json.model) return MapObjectFactory.loadFromJSONByModel(json);
		if(json.template) return MapObjectFactory.loadFromJSONByTemplate(json);
		if(json.constructor) return MapObjectFactory.loadFromJSONByConstructor(json);
	}

	static loadFromJSONByConstructor(json){
		var constructor = MapObjectFactory.getConstructorByName(json.constructor);
		if(!constructor) {
			Logger.error(util.format("BAD MAPOBJECT CONSTRUCTOR: %s", json.constructor));
			return;
		}

		return MapObjectFactory.construct(constructor, json);
	}

	static loadFromJSONByTemplate(json){
		var templateName = json.template;
		var template = TemplateManager.getTemplateByName(templateName);
		var obj = template.spawn();
		obj.__fromJSON(json);
		return obj;
	}

	static loadFromJSONByModel(json){
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
