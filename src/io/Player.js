// node include
var EventEmitter = require("events");

// local includes
var MUD;
var Mob;
var _ = require("../../i18n");
var Logger = require("../util/Logger");

class Player extends EventEmitter {
	constructor(options){
		super();
		this._client = null;
		this._mob = null;

		if(options){
			if(options.client) this.connect(options.client);
		}
	}

	get mob(){
		return this._mob;
	}

	set mob(mob){
		if(this._mob == mob) return;

		var omob;
		if(this._mob) {
			omob = this._mob;
			this._mob = null;
		}

		if(omob) omob.player = null;

		if(mob && mob instanceof Mob){
			this._mob = mob;
			mob.player = this;
		}
	}

	/**
	 * Runs when a mob is connected to this Player.
	 */
	join(){
	}

	/**
	 * Runs when a mob is disconnected from this Player.
	 */
	leave(){
	}

	/**
	 * Runs when a client is connected to this Player.
	 */
	join(){
	}

	/**
	 * Runs when a client is disconnected from this Player.
	 */
	leave(){
	}

	/**
	 * Process command input sent by this player.
	 * @param {string} input
	 */
	command(input){
		Logger.verbose(_("Player command: '%s'", input));
		this.sendLine(_("You said: '%s'", input));
	}

	/**
	 * Send a line of text to the player.
	 * @param {string} line
	 */
	sendLine(line){
		this._client.sendLine(line);
	}

	/**
	 * Start managing a client.
	 * @param {MUDClient} client
	 */
	connect(client){
		Logger.verbose(_("connected player"));

		// start listening for commands
		var player = this;
		this._client = client;
		client.on("command", function(input){
			player.command(input);
		});

		// start listening for disconnection
		client.once("disconnect", function(){
			player.disconnect();
		});

		this.join();
	}

	/**
	 * Stop managing the current client.
	 */
	disconnect(){
		Logger.verbose(_("disconnected player"));
		this.leave();
	}
}

module.exports = Player;

// cyclical includes
MUD = require("../core/MUD");
Mob = require("../map/Mob");