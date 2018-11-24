// local includes
var Tile = require("./Tile");

class Map{
	/**
	 * Construct a map.
	 * @param {Object} options Constructor options.
	 * @param {number} options.width
	 * @param {number} options.height
	 * @param {number} options.levels
	 */
	constructor(options){
		// proportions
		this._width = 0;
		this._height = 0;
		this._levels = 0;

		// literal representation of the grid
		this._grid = null;

		// keeping track of all objects
		this._tiles = [];
		this._objects = [];

		// process options
		if(options){
			if(options.width != null && options.height != null && options.levels != null) {
				this.setSize(options.width, options.height, options.levels);
			}
		}
	}

	/**
	 * Returned by `Map.size`.
	 * @typedef {Object} MapSize
	 * @property {number} MapSize.width
	 * @property {number} MapSize.height
	 * @property {number} MapSize.levels
	 */

	/** @return {MapSize} */
	get size(){
		return {width:this._width, height:this._height, levels:this._levels};
	}

	get width(){
		return this._width;
	}

	get height(){
		return this._height;
	}

	get levels(){
		return this._levels;
	}

	/**
	 * Must use this function to generate a proper map.
	 * @param {!number} width New width of the map.
	 * @param {!number} height New height of the map.
	 * @param {!number} levels New levels of the map.
	 */
	setSize(width, height, levels){
		if(this._grid) return;
		this._levels = levels;
		this._height = height;
		this._width = width;
		this.generate();
	}

	/**
	 * Get the tile at the given location on the grid.
	 * @param {number} x The column.
	 * @param {number} y The row.
	 * @param {number} z The level.
	 */
	getTileByXYZ(x,y,z){
		return this._grid[z][y][x];
	}

	/**
	 * Add a MapObject to the list of objects on the map.
	 * @param {MapObject} mapobject MapObject to add.
	 */
	add(mapobject){
		if(this._objects.indexOf(mapobject) != -1) return; // already in objects
		this._objects.push(mapobject);
	}

	/**
	 * Remove a MapObject from the list of objects on the map.
	 * @param {MapObject} mapobject MapObject to remove.
	 */
	remove(mapobject){
		var pos = this._objects.indexOf(mapobject);
		if(pos == -1) return; // not in objects
		this._objects.splice(pos, 1);
	}

	/**
	 * Generate a new map grid.
	 */
	generate(){
		this._grid = [];
		for(var z=0;z<this._levels;z++){
			this._grid[z] = [];
			for(var y=0;y<this._height;y++){
				this._grid[z][y] = [];
				for(var x=0;x<this._width;x++){
					this._grid[z][y][x] = new Tile({map:this,x:x,y:y,z:z});
					this._tiles.push(this._grid[z][y][x]);
				}
			}
		}
	}
}

module.exports = Map;
