var map;

class MapManager{
	static get map(){
		return map;
	}

	static set map(_map){
		map = _map;
	}
}

module.exports = MapManager;
