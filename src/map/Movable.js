var MapObject = require("./MapObject");
var Tile;

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

	move(loc){
		if(!this.canMove(loc)) return;
		this.loc = loc;
	}
}

module.exports = Movable;

Tile = require("./Tile");