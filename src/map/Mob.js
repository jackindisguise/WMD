// local includes
var Player;
var Movable = require("./Movable");

/**
 * Represents an animate creature on the map.
 * @extends Movable
 */
class Mob extends Movable{
	constructor(options){
		super(options);

		/**
		 * The player currently managing us.
		 * @alias Mob#player
		 * @type {?Player}
		 */
		this._player = null;
	}

	/**
	 * Will be described later via race and class.
	 */
	get tnl(){
		return -1;
	}

	get player(){
		return this._player;
	}

	set player(player){
		if(this._player === player) return;

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
	login(){
	}

	/**
	 * Runs when a Player is disconnected from this Mob.
	 * @param {Player} player Player disconnected from.
	 */
	logout(){
	}
}

/**
 * This mob's experience level.
 * @type {!number}
 */
Mob.prototype.level = 0;

/**
 * This mob's experience points.
 * @type {!number}
 */
Mob.prototype.experience = 0;

/** @default "mob" */
Mob.prototype.keywords = "mob";

/** @default "Mob" */
Mob.prototype.display = "Mob";

module.exports = Mob;

// cyclical includes
Player = require("../core/Player");