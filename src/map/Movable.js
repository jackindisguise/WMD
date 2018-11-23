var MapObject = require("./MapObject");
var Tile;

/**
 * Base object that can move around the map.
 * @extends MapObject
 */
class Movable extends MapObject{
	constructor(options){
		super(options);

		/** @default "movable" */
		this.keywords = "movable";

		/** @default "Movable" */
		this.display = "Movable";
	}

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
	 * Check if we can move to a new location.
	 * @param {MapObject} loc 
	 */
	canMove(loc){
		if(this.loc && !this.loc.canExit(this)) return;
		if(!loc.canEnter(this)) return;
		return true;
	}
}

module.exports = Movable;

// cyclical includes
Tile = require("./Tile");