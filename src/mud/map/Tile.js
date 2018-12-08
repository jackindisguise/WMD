// node includes
var util = require("util");

// local includes
var MapObject = require("./MapObject");

/**
 * Represents an inhabitable location on a map.
 * @extends MapObject
 */
class Tile extends MapObject{
	/**
	 * Construct a tile.
	 * @param {TileConstructorOptions} options Constructor options.
	 */
	constructor(options){
		super();

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

	toString(){
		return util.format("{Tile<%d,%d,%d>}", this.x, this.y, this.z)
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
		if(mapobject.loc === this && this._map) this._map.add(mapobject);
	}

	/**
	 * Remove an object from our contents.
	 * Also removes the object from the map we live on.
	 * @param {MapObject} mapobject Object to remove.
	 */
	remove(mapobject){
		super.remove(mapobject);
		if(mapobject.loc !== this && this._map) this._map.remove(mapobject);
	}

	/**
	 * Get the tile in the given direction.
	 * @param {Direction.flags} dir 
	 */
	getStep(dir){
		if(this.map)
			return this.map.getStep(this.x, this.y, this.z, dir);
	}
}

Tile.prototype._map = null;

Tile.prototype._x = null;
Tile.prototype._y = null;
Tile.prototype._z = null;

/** @default "tile" */
Tile.prototype.keywords = "tile";

/** @default "Tile" */
Tile.prototype.display = "Tile";

/** @default "A generic tile." */
Tile.prototype.description = "A generic tile."

module.exports = Tile;

/**
 * Sole valid argument for `new Tile()`.
 * @typedef {Object} TileConstructorOptions
 * @property {Map} map The map we're a part of.
 * @property {number} x The x location we inhabit. Can only be set at creation.
 * @property {number} y The y location we inhabit. Can only be set at creation.
 * @property {number} z The z location we inhabit. Can only be set at creation.
 */