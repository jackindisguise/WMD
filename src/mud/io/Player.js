// node include
var EventEmitter = require("events");
var util = require("util");

// local includes
var MUD, Database, Mob, Nanny;
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var MessageCategory = require("../MessageCategory");

/**
 * Higher level abstraction between the client and the game.
 */
class Player extends EventEmitter {
	/**
	 * Construct a player.
	 * @param {PlayerConstructorOptions} options Constructor options.
	 */
	constructor(options){
		super();
		if(options){
			if(options.client) this.connect(options.client);
			if(options.mob) this.mob = options.mob;
		}
	}

	toString(){
		if(this.mob) return util.format("{Player@%s}", this.mob.name);
		if(this.socketID) return util.format("{Player#%s}", this.socketID);
		return "{Player}";
	}

	get socketID(){
		return this._client ? this._client.id : null;
	}

	get mob(){
		return this._mob;
	}

	set mob(mob){
		if(this._mob === mob) return;

		var omob;
		if(this._mob) {
			this.logout();
			omob = this._mob;
			this._mob = null;
		}

		if(omob) {
			omob.player = null;
		}

		if(mob && mob instanceof Mob){
			this._mob = mob;
			mob.player = this;
			this.login();
		}
	}

	/**
	 * Process command input sent by this player.
	 * @param {string} input
	 */
	command(input){
		// log input
		Logger.debug(_("Player command: '%s'", input));

		// callback piping
		if(this._callback) {
			var callback = this._callback;
			this._callback = null;
			callback.call(this, input);

		// command processing
		} else if(this.mob) {
			var result = Database.processCommand(this.mob, input);
			if(!result) {
				this.sendLine(_("Do what, now?"));
			}
		}
	}

	/**
	 * Ask a question of the player and pipe next command to callback.
	 * @param {string} question 
	 * @param {function} callback 
	 */
	ask(question, callback){
		if(question) this.sendLine(_(question));
		this._callback = callback;
	}

	/**
	 * Sends a categorized message to the player.
	 * @param {string} line 
	 * @param {} category 
	 */
	sendMessage(line, category){
		if(this._client) this._client.sendMessage(line, category);
	}

	/**
	 * Send a line of text to the player.
	 * @param {string} line
	 */
	sendLine(line){
		this.sendMessage(line, MessageCategory.DEFAULT);
	}

	/**
	 * Runs after a mob is connected to this Player.
	 */
	login(){
		this.mob.joinChannels();
	}

	/**
	 * Runs before a mob is disconnected from this Player.
	 */
	logout(mob){
		this.mob.leaveChannels();
	}

	/**
	 * Runs when a client is connected to this Player.
	 * @param {Client} client Client connected to.
	 */
	join(){
		var nanny = new Nanny({player:this});
		nanny.login();
	}

	/**
	 * Runs when a client is disconnected from this Player.
	 * @param {Client} client Client disconnected from.
	 */
	leave(){
	}

	/**
	 * Start managing a client.
	 * @param {Client} client
	 */
	connect(client){
		Logger.debug(_("connected player"));

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
		Logger.debug(_("disconnected player"));

		var oclient = this._client;
		this._client = null;
		// stop listening for commands?
		// stop listening for disconnection?

		this.leave(oclient);

		/**
		 * Propagates socket disconnect event.
		 * @event Player#disconnect
		 */
		this.emit("disconnect");
	}

	quit(){
		this.sendLine("Later, skater.");
		this._client.quit();
	}
}

Player.prototype._lastMessageCategory = null;
Player.prototype._client = null;
Player.prototype._mob = null;
Player.prototype._callback = null;

module.exports = Player;

/**
 * Sole valid argument for `new Player()`.
 * @typedef {Object} PlayerConstructorOptions
 * @property {Client} client The client to manage.
 * @property {Mob} mob The mob to manage.
 */

// cyclical includes
MUD = require("../core/MUD");
Database = require("../core/Database");
Mob = require("../map/Mob");
Nanny = require("../Nanny");