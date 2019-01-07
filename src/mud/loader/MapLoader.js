// node includes
const fs = require("fs");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const ObjectFactory = require("../factory/MapObjectFactory");
const MapManager = require("../manager/MapManager");
const Map = require("../map/Map");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		let waiting = files.length;
		function next() { waiting--; if(waiting === 0) callback(); }
		for(let file of files){
			let _file = directory+"/"+file;
			let stats = fs.lstatSync(_file);
			if(stats.isDirectory()) deepSearch(_file, fileFun, next);
			else fileFun(_file, next);
		}
	});
}

// map loader
module.exports = function(callback){
	Logger.info(_("> Loading maps..."));
	deepSearch("./data/map", function(file, next){
		let f = file.slice("./data/map".length); // cut off relative path from root
		let json = require("../../../data/map/"+f);
		Logger.info(_(">> Loading map '%s'", json.name));
		let map = new Map();
		map.__fromJSON(json);
	
		// load tiles here
		for(let z=0;z<json.proportions.levels;z++){
			for(let y=0;y<json.proportions.height;y++){
				for(let x=0;x<json.proportions.width;x++){
					let char = json.tiles[z][y][x];
					let tileJSON = json.materials[char];
					let tile = ObjectFactory.loadFromJSON(tileJSON.tile);
					map.setTile(tile, x, y, z);
				}
			}
		}
	
		MapManager.add(map);
		next();
	}, callback);
};
