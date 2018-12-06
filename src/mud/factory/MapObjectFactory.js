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

class MapObjectFactory{
	static getConstructorByType(name){
		return _constructorNames[name];
	}

	/**
	 * Load from JSON from a base object with no template itself.
	 * @param {Object} json 
	 * @param {function} constructor 
	 */
	static loadFromBaseJSON(json, constructor){
		var obj = new constructor();
		obj.__fromJSON(json);
		return obj;
	}

	/**
	 * Load from JSON from an instance object spawned from a template.
	 * @param {Object} json 
	 */
	static loadFromInstanceJSON(json){
		var templateName = json.template;
		var template = TemplateManager.getTemplateByName(templateName);
		var constructor = template.type;
		var obj = new constructor({template:template});
		return obj;
	}
}

module.exports = MapObjectFactory;
