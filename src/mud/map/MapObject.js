// local includes
var TemplateManager = require("../manager/TemplateManager");

// local
var nextID = 0;

/**
 * The base object that can legally inhabit a {@link Map}.
 */
class MapObject{
	/**
	 * Construct a MapObject.
	 * @param {MapObjectConstructorOptions} options
	 */
	constructor(options){
		this._id = nextID++;
		this._contents = [];

		if(options){
			if(options.loc != null) this.loc = options.loc;
			if(options.template != null) this.template = options.template;
		}
	}

	toString(){
		return "{MapObject}";
	}

	get id(){
		return this._id;
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
		if(this._template) return;
		this.__proto__ = template.obj;
		this._template = template;

		// clone contents of template
		for(var obj of template.obj.contents){
			var clone = obj.clone();
			clone.loc = this;
		}
	}

	get template(){
		return this._template;
	}

	// recursive reference between a map object's loc and the loc's contents.
	// if mapobject A is in mapobject B's contents, mapobject A's loc must be mapobject B.
	set loc(loc){
		// do nothing, already here
		if(this._loc == loc) return;

		// preserve old loc
		var oloc;
		if(this._loc){
			oloc = this._loc;
			this._loc = null; // set to null first
		}

		// remove us from oloc's contents
		if(oloc) oloc.remove(this); // cyclical dereference

		// set to new loc
		if(loc && loc instanceof MapObject){
			this._loc = loc;
			loc.add(this); // cyclical reference
		}
	}

	__JSONWrite(key, value, json){
		switch(key){
			// no id
			case "_id": break;

			// no loc
			case "_loc": break;

			// save template ID
			case "_template":
				if(value === null) break;
				json.template = value.name;
				break;

			// convert contents list to JSON
			case "_contents":
				if(!value.length) return;

				// convert inventory to JSON
				var converted = [];
				for(var object of value){
					if(object instanceof MapObject)
						converted.push(object.__toJSON());
				}
		
				if(converted.length) json.contents = converted;
				break;

			// write value generically
			default:
				Object.__JSONWrite.call(this, key, value, json);
				break;
		}
	}

	__JSONRead(key, value){
		switch(key){
			case "template":
				var template = TemplateManager.getTemplateByName(value);
				if(template) this.template = template;
				break;

			// load contents elsewhere
			// since this requires the context of other
			// descendent map objects, there's no way
			// to accomplish it here without cyclical
			// includes. which i'm trying to avoid. :)
			case "contents":
				break;

			// read value generically
			default: Object.__JSONRead.call(this, key, value); break;
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
		if(!this.canMove(loc)) return;
		this.loc = loc;
	}

	/**
	 * Add an object to our contents.
	 * @param {MapObject} mapobject Object to add.
	 */
	add(mapobject){
		if(this._contents.indexOf(mapobject) >= 0) return; // already in contents
		this._contents.push(mapobject);
		if(mapobject.loc != this) mapobject.loc = this; // cyclical reference
	}

	/**
	 * Remove an object from our contents.
	 * @param {MapObject} mapobject Object to remove.
	 */
	remove(mapobject){
		var pos = this._contents.indexOf(mapobject);
		if(pos == -1) return; // not in contents
		this._contents.splice(pos, 1);
		if(mapobject.loc == this) mapobject.loc = null; // cyclical dereference
	}

	clone(obj){
		var json = this.__toJSON();
		var constructor = this.constructor;
		var clone = new constructor();
		clone.__fromJSON(json);

		// clone contents
		for(var obj of this.contents){
			var _clone = obj.clone();
			_clone.loc = clone;
		}

		return clone;
	}
}

MapObject.prototype._id = null;
MapObject.prototype._template = null;

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
