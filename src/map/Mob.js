// local includes
var Player;
var Movable = require("./Movable");

/**
 * Represents creatures.
 */
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

		if(oplayer) {
			oplayer.mob = null;
			this.logout(oplayer);
		}

		if(player && player instanceof Player){
			this._player = player;
			player.mob = this;
			this.login(player);
		}
	}

	/**
	 * Runs when a Player is connected to this Mob.
	 * @param {Player} player Player connected to.
	 */
	login(player){
	}

	/**
	 * Runs when a Player is disconnected from this Mob.
	 * @param {Player} player Player disconnected from.
	 */
	logout(player){
	}
}

module.exports = Mob;

// cyclical includes
Player = require("../io/Player");