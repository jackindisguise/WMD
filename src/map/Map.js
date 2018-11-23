// local includes
var MapObject = require("./MapObject");
var Tile = require("./Tile");

class Map{
	/**
	 * 
	 * @param {Object} options
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
	 * Takes an option table with width/height/levels.
	 * Must use this feature to generate a map that's empty.
	 * @param {number} width
	 * @param {number} height
	 * @param {number} levels
	 */
	setSize(width, height, levels){
		if(this._grid) return;
		this._levels = levels;
		this._height = height;
		this._width = width;
		this.generate();
	}

	getTileByXYZ(x,y,z){
		return this._grid[z][y][x];
	}

	add(mapobject){
		if(this._objects.indexOf(mapobject) != -1) return; // already in objects
		this._objects.push(mapobject);
	}

	remove(mapobject){
		var pos = this._objects.indexOf(mapobject);
		if(pos == -1) return; // not in objects
		this._objects.splice(pos, 1);
	}

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
