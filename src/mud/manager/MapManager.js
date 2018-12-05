var _map;

class MapManager{
	static get map(){
		return _map;
	}

	static set map(map){
		_map = map;
	}
}

module.exports = MapManager;
