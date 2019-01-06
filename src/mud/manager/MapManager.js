var maps = [];

class MapManager{
	static add(map){
		if(maps.indexOf(map) != -1) return;
		maps.push(map);
	}

	static remove(map){
		var pos = maps.indexOf(map);
		if(pos == -1) return;
		maps.splice(pos, 1);
	}

	static getMapByName(name){
		for(var map of maps){
			if(map.name === name) return map;
		}
	}

	static get maps(){ return maps; }
}

module.exports = MapManager;
