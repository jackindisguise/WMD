// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ObjectFactory = require("../factory/MapObjectFactory");
var MapManager = require("../manager/MapManager");
var Map = require("../map/Map");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		var waiting = files.length;
		function next() { waiting--; if(waiting === 0) callback(); }
		for(var file of files){
			var _file = directory+"/"+file;
			var stats = fs.lstatSync(_file);
			if(stats.isDirectory()) deepSearch(_file, fileFun, next);
			else fileFun(_file, next);
		}
	});
}

// map loader
module.exports = function(callback){
	Logger.info(_("> Loading maps..."));
	deepSearch("./data/map", function(file, next){
		var f = file.slice("./data/map".length); // cut off relative path from root
		var json = require("../../../data/map/"+f);
		Logger.info(_(">> Loading map '%s'", json.name));
		var map = new Map();
		map.__fromJSON(json);
	
		// load tiles here
		for(var z=0;z<json.proportions.levels;z++){
			for(var y=0;y<json.proportions.height;y++){
				for(var x=0;x<json.proportions.width;x++){
					var char = json.tiles[z][y][x];
					var tileJSON = json.materials[char];
					var tile = ObjectFactory.loadFromJSON(tileJSON.tile);
					map.setTile(tile, x, y, z);
				}
			}
		}
	
		MapManager.add(map);
		next();
	}, callback);
};
