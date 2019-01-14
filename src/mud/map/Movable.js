// node includes
const util = require("util");

// local includes
const MapObject = require("./MapObject");
const Tile = require("./Tile");

/**
 * Base object that can move around the map.
 * @extends MapObject
 */
class Movable extends MapObject{
	get x(){
		if(this.loc instanceof Tile) return this.loc.x;
		return null;
	}

	get y(){
		if(this.loc instanceof Tile) return this.loc.y;
		return null;
	}

	get z(){
		if(this.loc instanceof Tile) return this.loc.z;
		return null;
	}

	get map(){
		if(this.loc instanceof Tile) return this.loc.map;
		return null;
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
		return this.name || util.format("[Movable<%d,%d,%d>]", this.x, this.y, this.z);
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

	step(dir){
		let tile = this.getStep(dir);
		if(!tile) return false;
		return this.move(tile);
	}
}

/** @default "movable" */
Movable.prototype.keywords = "movable";

/** @default "Movable" */
Movable.prototype.display = "Movable";

module.exports = Movable;
