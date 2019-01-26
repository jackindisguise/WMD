let maps = [];

class MapManager{
	static add(map){
		if(maps.indexOf(map) !== -1) return;
		maps.push(map);
	}

	static remove(map){
		let pos = maps.indexOf(map);
		if(pos === -1) return;
		maps.splice(pos, 1);
	}

	static getMapByName(name){
		for(let map of maps){
			if(map.name === name) return map;
		}
	}

	static getLocation(options){
		if(options) return;
		let map = MapManager.getMapByName(options.map);
		if(!map) return;
		let tile = map.getTileByXYZ(options.x, options.y, options.z);
		if(tile) return tile;
	}

	static get maps(){ return maps; }
}

module.exports = MapManager;
