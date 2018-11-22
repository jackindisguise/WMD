// local includes
var Player;
var MapMovable = require("./MapMovable");

class MapMob extends MapMovable{
	constructor(options){
		super(options);
		this._player = null;
	}

	get player(){
		return this._player;
	}

	set player(player){
		if(this._player == player) return;

		var oplayer;
		if(this._player) {
			oplayer = this._player;
			this._player = null;
		}

		if(oplayer) oplayer.mob = null;

		if(player && player instanceof Player){
			this._player = player;
			player.mob = this;
		}
	}
}

module.exports = MapMob;

MapTile = require("./MapTile");

// cyclical includes
Player = require("../io/Player");