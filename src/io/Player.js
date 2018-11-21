// node include
var EventEmitter = require("events");

// local includes
var MUD;
var _ = require("../../i18n");
var Logger = require("../util/Logger");

class Player extends EventEmitter {
	constructor(client){
		super();
		this._client = null;
		if(client) this.connect(client);
	}

	/**
	 * Runs when a client is connected to this Player.
	 */
	login(){
	}

	/**
	 * Runs when a client is disconnect from this Player.
	 */
	logout(){
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
		var player = this;
		this._client = client;
		client.on("command", function(input){
			player.command(input);
		});

		client.once("disconnect", function(){
			player.disconnect();
		});

		this.login();
	}

	/**
	 * Stop managing the current client.
	 */
	disconnect(){
		Logger.verbose(_("disconnected player"));
		this.logout();
	}
};

module.exports = Player;

// cyclical includes
MUD = require("../core/MUD");