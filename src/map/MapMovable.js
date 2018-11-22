var MapObject = require("./MapObject");
var MapTile;

class MapMovable extends MapObject{
	get x(){
		if(this.loc instanceof MapTile)
			return this.loc.x;
	}

	get y(){
		if(this.loc instanceof MapTile)
			return this.loc.y;
	}

	get z(){
		if(this.loc instanceof MapTile)
			return this.loc.z;
	}

	move(loc){
		if(!this.canMove(loc)) return;
		this.loc = loc;
	}
}

module.exports = MapMovable;

MapTile = require("./MapTile");