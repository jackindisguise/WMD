// local includes
var MapObject = require("./MapObject");

/**
 * Represents an inhabitable location on a map.
 * @extends MapObject
 */
class Tile extends MapObject{
	/**
	 * Construct a tile.
	 * @param {Object} options Constructor options.
	 * @param {Map} options.map The map we're a part of.
	 * @param {number} options.x The x location we inhabit. Can only be set at creation.
	 * @param {number} options.y The y location we inhabit. Can only be set at creation.
	 * @param {number} options.z The z location we inhabit. Can only be set at creation.
	 */
	constructor(options){
		super();

		/** @default "tile" */
		this.keywords = "tile";

		/** @default "Tile" */
		this.display = "Tile";

		if(options){
			if(options.map){
				this._map = options.map;
			}

			// xyz can only be set when being created
			if(options.x != null && options.y != null && options.z != null){
				this._x = options.x;
				this._y = options.y;
				this._z = options.z;
			}
		}
	}

	get map(){
		return this._map;
	}

	get x(){
		return this._x;
	}

	get y(){
		return this._y;
	}

	get z(){
		return this._z;
	}

	/**
	 * Add an object to our contents.
	 * Also adds the object to the map we live on.
	 * @param {MapObject} mapobject Object to add.
	 */
	add(mapobject){
		super.add(mapobject);
		if(mapobject.loc == this) this._map.add(mapobject);
	}

	/**
	 * Remove an object from our contents.
	 * Also removes the object from the map we live on.
	 * @param {MapObject} mapobject Object to remove.
	 */
	remove(mapobject){
		super.remove(mapobject);
		if(mapobject.loc != this) this._map.remove(mapobject);
	}
}

module.exports = Tile;
