var Map = require("../map/Map");

var _map = new Map()

class MapManager{
	static get map(){
		return _map;
	}

	static set map(map){
		_map = map;
	}
}

module.exports = MapManager;
