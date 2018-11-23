// node include
var EventEmitter = require("events");

// local includes
var MUD;
var Mob;
var _ = require("../../i18n");
var Logger = require("../util/Logger");

/**
 * Higher level abstraction between the client and the game.
 */
class Player extends EventEmitter {
	/**
	 * Construct a player.
	 * @param {Object} options Constructor options.
	 * @param {Client} options.client The client to manage.
	 * @param {Mob} options.mob The mob to manage.
	 */
	constructor(options){
		super();
		this._client = null;
		this._mob = null;

		if(options){
			if(options.client) this.connect(options.client);
			if(options.mob) this.mob = options.mob;
		}
	}

	get mob(){
		return this._mob;
	}

	set mob(mob){
		if(this._mob === mob) return;

		var omob;
		if(this._mob) {
			omob = this._mob;
			this._mob = null;
		}

		if(omob) {
			omob.player = null;
			this.logout();
		}

		if(mob && mob instanceof Mob){
			this._mob = mob;
			mob.player = this;
			this.login();
		}
	}

	/**
	 * Runs when a mob is connected to this Player.
	 * @param {Mob} mob Mob connected to.
	 */
	login(mob){
	}

	/**
	 * Runs when a mob is disconnected from this Player.
	 * @param {Mob} mob Mob disconnected from.
	 */
	logout(mob){
	}

	/**
	 * Runs when a client is connected to this Player.
	 * @param {Client} client Client connected to.
	 */
	join(client){
		Logger.silly(_("Client and player fully synchronized."));
		this.sendLine(_("Client and player fully synchronized."))
	}

	/**
	 * Runs when a client is disconnected from this Player.
	 * @param {Client} client Client disconnected from.
	 */
	leave(client){
		Logger.silly(_("Client and player fully desynchronized."));
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
	 * @param {Client} client
	 */
	connect(client){
		Logger.verbose(_("connected player"));

		// start listening for commands
		this._client = client;
		client.on("command", function(input){
			this.command(input);
		}.bind(this));

		// start listening for disconnection
		client.once("disconnect", function(){
			this.disconnect();
		}.bind(this));

		this.join(client);
	}

	/**
	 * Stop managing the current client.
	 */
	disconnect(){
		Logger.verbose(_("disconnected player"));

		var oclient = this._client;
		this._client = null;
		// stop listening for commands?
		// stop listening for disconnection?

		this.leave(oclient);
	}
}

module.exports = Player;

// cyclical includes
MUD = require("../core/MUD");
Mob = require("../map/Mob");