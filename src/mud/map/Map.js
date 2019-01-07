// local includes
const Direction = require("../Direction");

class Map{
	/**
	 * Construct a map.
	 * @param {MapConstructorOptions} options Constructor options.
	 */
	constructor(options){
		// keeping track of all objects
		this._tiles = [];
		this._objects = [];

		// process options
		if(options){
			if(options.name) this.name = options.name;
			if(options.width != null && options.height != null && options.levels != null) {
				this.setSize(options.width, options.height, options.levels, options.fill);
			}
		}
	}

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
	setSize(width, height, levels, fill){
		if(this._grid) return;
		this._levels = levels;
		this._height = height;
		this._width = width;
		this.generate(fill);
	}

	/**
	 * Get the tile at the given location on the grid.
	 * @param {number} x The column.
	 * @param {number} y The row.
	 * @param {number} z The level.
	 */
	getTileByXYZ(x,y,z){
		if(x < 0 || x >= this.width) return;
		if(y < 0 || y >= this.height) return;
		if(z < 0 || z >= this.levels) return;
		return this._grid[z][y][x];
	}

	/**
	 * Get the tile in the given direction.
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} z 
	 * @param {Direction.flags} dir 
	 */
	getStep(x,y,z,dir){
		if(dir&Direction.flag.NORTH) y--;
		if(dir&Direction.flag.SOUTH) y++;
		if(dir&Direction.flag.EAST) x++;
		if(dir&Direction.flag.WEST) x--;
		if(dir&Direction.flag.UP) z++;
		if(dir&Direction.flag.DOWN) z--;
		return this.getTileByXYZ(x,y,z);
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
		let pos = this._objects.indexOf(mapobject);
		if(pos == -1) return; // not in objects
		this._objects.splice(pos, 1);
	}

	setTile(tile, x, y, z){
		this._tiles.push(tile);
		this._grid[z][y][x] = tile;
		tile._x = x;
		tile._y = y;
		tile._z = z;
		tile._map = this;
	}

	/**
	 * Generate a new map grid.
	 */
	generate(fill){
		this._grid = [];
		for(let z=0;z<this._levels;z++){
			this._grid[z] = [];
			for(let y=0;y<this._height;y++){
				this._grid[z][y] = [];
				for(let x=0;x<this._width;x++){
					if(fill) this._grid[z][y][x] = new fill({x:x,y:y,z:z});
					else this._grid[z][y][x] = null;
				}
			}
		}
	}

	__JSONRead(key, value){
		switch(key){
			case "proportions":
				this.setSize(value.width, value.height, value.levels);
				this.generate();
				break;

			case "materials":
			case "tiles":
				break;

			default:
				super.__JSONRead(key, value);
				break;
		}
	}
}

// identifier
Map.prototype.name = null;

// proportions
Map.prototype._width = 0;
Map.prototype._height = 0;
Map.prototype._levels = 0;

// literal representation of the grid
Map.prototype._grid = null;

// keeping track of all objects
Map.prototype._tiles = null;
Map.prototype._objects = null;

module.exports = Map;

/**
 * Sole valid argument for `new Map()`.
 * @typedef {Object} MapConstructorOptions
 * @property {number} width
 * @property {number} height
 * @property {number} levels
 */

/**
 * Returned by `Map.size`.
 * @typedef {Object} MapSize
 * @property {number} width
 * @property {number} height
 * @property {number} levels
 */
