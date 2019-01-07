// node includes
const util = require("util");

// local includes
const Logger = require("../../util/Logger");
const TemplateManager = require("../manager/TemplateManager");
const ModelManager = require("../manager/ModelManager");
const MapObject = require("../map/MapObject");
const Movable = require("../map/Movable");
const Mob = require("../map/Mob");
const Item = require("../map/Item");
const Equipment = require("../map/Equipment");
const Weapon = require("../map/Weapon");
const Armor = require("../map/Armor");
const Shield = require("../map/Shield");
const Tile = require("../map/Tile");

// constructor name table
const constructorNames = {
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
		let constructor = MapObjectFactory.getConstructorByName(json.constructor);
		if(!constructor) {
			Logger.error(util.format("BAD MAPOBJECT CONSTRUCTOR: %s", json.constructor));
			return;
		}

		return MapObjectFactory.construct(constructor, json);
	}

	static loadFromJSONByTemplate(json){
		let templateName = json.template;
		let template = TemplateManager.getTemplateByName(templateName);
		let obj = template.spawn();
		obj.__fromJSON(json);
		return obj;
	}

	static loadFromJSONByModel(json){
		let modelName = json.model;
		let model = ModelManager.getModelByName(modelName);
		let obj = model.spawn();
		obj.__fromJSON(json);
		return obj;
	}

	static construct(constructor, json){
		let obj = new constructor();
		obj.__fromJSON(json);

		// load contents
		if(json.contents){
			for(let _json of json.contents){
				let _obj = MapObjectFactory.loadFromJSON(_json);
				if(_obj) _obj.loc = obj;
			}
		}

		return obj;
	}
}

module.exports = MapObjectFactory;
