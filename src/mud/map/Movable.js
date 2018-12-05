// node includes
var util = require("util");

// local includes
var MapObject = require("./MapObject");
var Tile = require("./Tile");

/**
 * Base object that can move around the map.
 * @extends MapObject
 */
class Movable extends MapObject{
	get x(){
		if(this.loc instanceof Tile)
			return this.loc.x;
	}

	get y(){
		if(this.loc instanceof Tile)
			return this.loc.y;
	}

	get z(){
		if(this.loc instanceof Tile)
			return this.loc.z;
	}

	/**
	 * Get the tile in the given direction.
	 * @param {Direction.flags} dir 
	 */
	getStep(dir){
		if(this.loc instanceof Tile)
			return this.loc.getStep(dir);
	}

	toString(){
		return util.format("{Movable<%d,%d,%d>}", this.x, this.y, this.z)
	}

	/**
	 * Check if we can move to a new location.
	 * @param {MapObject} loc 
	 */
	canMove(loc){
		if(this.loc && !this.loc.canExit(this)) return;
		if(!loc.canEnter(this)) return;
		return true;
	}
}

/** @default "movable" */
Movable.prototype.keywords = "movable";

/** @default "Movable" */
Movable.prototype.display = "Movable";

module.exports = Movable;
