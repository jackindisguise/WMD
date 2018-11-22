// local includes
var MapObject = require("./MapObject");

class MapTile extends MapObject{
	constructor(options){
		super(options);
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

	add(mapobject){
		super.add(mapobject);
		if(mapobject.loc == this) this._map.add(mapobject);
	}

	remove(mapobject){
		super.remove(mapobject);
		if(mapobject.loc != this) this._map.remove(mapobject);
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
}

module.exports = MapTile;
