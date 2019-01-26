// local includes
const TemplateManager = require("../manager/TemplateManager");
const ModelManager = require("../manager/ModelManager");

/**
 * The base object that can legally inhabit a {@link Map}.
 */
class MapObject{
	/**
	 * Construct a MapObject.
	 * @param {MapObjectConstructorOptions} options
	 */
	constructor(options){
		this._contents = [];

		if(options){
			if(options.loc != null) this.loc = options.loc;
			if(options.template != null) this.template = options.template;
		}
	}

	__toJSON(){
		let json = {constructor:this.constructor.name}; // add constructor to default json result
		for(let variable in this) this.__JSONWrite(variable, this[variable], json);
		return json;
	}

	__JSONWrite(key, value, json){
		let converted;
		switch(key){
		// save template name
		case "_template":
			if(value === null) break;
			json.template = value.name;
			break;

		// save mode name
		case "_model":
			if(value === null) break;
			json.model = value.name;
			break;

		// convert contents list to JSON
		case "_contents":
			if(!value.length) return;

			// convert inventory to JSON
			converted = [];
			for(let object of value){
				if(object instanceof MapObject)
					converted.push(object.__toJSON());
			}
		
			if(converted.length) json.contents = converted;
			break;

		// write value generically
		default:
			super.__JSONWrite(key, value, json);
			break;
		}
	}

	__JSONRead(key, value){
		let template, model;
		switch(key){
		case "template":
			template = TemplateManager.getTemplateByName(value);
			if(template) this.template = template;
			break;

		case "model":
			model = ModelManager.getModelByName(value);
			if(model) this.model = model;
			break;

		// load contents elsewhere
		// since this requires the context of other
		// descendent map objects, there's no way
		// to accomplish it here without cyclical
		// includes. which i'm trying to avoid. :)
		case "contents":
			break;

		// read value generically
		default: super.__JSONRead(key, value); break;
		}
	}

	toString(){
		return this.name || "[MapObject]";
	}

	get long(){
		return `${this.article}${this.name}`;
	}

	get article(){
		if(!this.name) return "";
		let firstLetterRule = /(?<!\{)([^{\s])/;
		let firstLetter = firstLetterRule.exec(this.name);
		if(firstLetter[0] === firstLetter[0].toUpperCase()) return "";
		let consonants = /[bcdfghjklmnpqrstvwxyz]/;
		if(firstLetter[0].match(consonants)) return "a ";
		else return "an ";
	}

	/**
	 * Shortcut for the display name.
	 */
	get name(){
		return this.display;
	}

	/**
	 * Shortcut for setting both display name and keywords.
	 */
	set name(name){
		this.display = name;
		this.keywords = name;
	}

	get contents(){
		return this._contents;
	}

	get loc(){
		return this._loc;
	}

	set template(template){
		if(this._model) return;
		this.__proto__ = template.obj;
		this._template = template;
	}

	set model(model){
		if(this._template) this._template = null;
		this.__proto__ = model.obj;
		this._model = model;
	}

	get template(){
		return this._template;
	}

	get model(){
		return this._model;
	}

	// recursive reference between a map object's loc and the loc's contents.
	// if mapobject A is in mapobject B's contents, mapobject A's loc must be mapobject B.
	set loc(loc){
		// do nothing, already here
		if(this._loc === loc) return;

		// preserve old loc
		let oloc;
		if(this._loc){
			oloc = this._loc;
			this._loc = null; // set to null first
		}

		// remove us from oloc's contents
		if(oloc instanceof MapObject) oloc.remove(this); // cyclical dereference

		// set to new loc
		if(loc && loc instanceof MapObject){
			this._loc = loc;
			loc.add(this); // cyclical reference
		}
	}

	/**
	 * Check if an object can enter our contents.
	 * @param {MapObject} enterer Object entering our contents.
	 * @return {boolean}
	 */
	canEnter(){
		return true;
	}

	/**
	 * Check if an object can leave our contents.
	 * @param {MapObject} exiter Object leaving our contents.
	 * @return {boolean}
	 */
	canExit(){
		return true;
	}

	/**
	 * Check if we can move to a new location.
	 * Base objects (see {@link MapObject}) cannot move, and as such this will always return false for them.
	 * @param {MapObject} loc 
	 */
	canMove(){
		return false;
	}

	/**
	 * Formal move that respects {@link MapObject#canMove}.
	 * @param {MapObject} loc Location to move to.
	 */
	move(loc){
		if(!this.canMove(loc)) return false;
		this.loc = loc;
		return true;
	}

	moveTo(x,y,z){
		if(!this.map) return;
		let tile = this.map.getTileByXYZ(x,y,z);
		if(tile) this.move(tile);
	}

	/**
	 * Add an object to our contents.
	 * @param {MapObject} mapobject Object to add.
	 */
	add(mapobject){
		if(this._contents.indexOf(mapobject) !== -1) return; // already in contents
		this._contents.push(mapobject);
		if(mapobject.loc !== this) mapobject.loc = this; // cyclical reference
	}

	/**
	 * Remove an object from our contents.
	 * @param {MapObject} mapobject Object to remove.
	 */
	remove(mapobject){
		let pos = this._contents.indexOf(mapobject);
		if(pos === -1) return; // not in contents
		this._contents.splice(pos, 1);
		if(mapobject.loc === this) mapobject.loc = null; // cyclical dereference
	}

	__createClone(){
		let clone = super.__createClone();

		// clone contents
		for(let obj of this.contents){
			let _clone = obj.__createClone();
			_clone.loc = clone;
		}

		return clone;
	}

	garbage(){
		this.loc = null;
	}
}

MapObject.prototype._template = null;
MapObject.prototype._model = null;

/**
 * The object we currently inhabit.
 * If your loc is an object, that means you are inside that object's contents list.
 * @alias MapObject#loc
 * @type {?MapObject}
 */
MapObject.prototype._loc = null;

/**
 * A list of all the objects inhabiting us.
 * @alias MapObject#contents
 * @type {!MapObject[]}
 */
MapObject.prototype._contents = null;

/**
 * Keywords for referring to this object.
 * @type {?string}
 * @default "map object mapobject"
 */
MapObject.prototype.keywords = "map object mapobject";

/**
 * The display string for this object.
 * @type {!string}
 * @default "MapObject"
 */
MapObject.prototype.display = "MapObject";

/**
 * A description for this object.
 * @type {?string}
 * @default null
 */
MapObject.prototype.description = null;

module.exports = MapObject;

/**
 * Sole valid argument for `new MapObject()`.
 * @typedef {Object} MapObjectConstructorOptions
 * @property {MapObject} loc Location to move to.
 */
