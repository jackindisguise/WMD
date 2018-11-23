// local includes
var Player;
var Movable = require("./Movable");

class Mob extends Movable{
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

module.exports = Mob;

// cyclical includes
Player = require("../io/Player");