// node include
const EventEmitter = require("events");
const util = require("util");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const MessageCategory = require("../../etc/MessageCategory");
const CommandHandler = require("../manager/CommandManager");
const ChannelManager = require("../manager/ChannelManager");
const Nanny = require("../Nanny");

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
		this._channels = [];

		if(options){
			if(options.client) this.connect(options.client);
			if(options.mob) this.mob = options.mob;
		}
	}

	toString(){
		if(this.mob) return util.format("<Player@%s>", this.mob.name);
		if(this.socketID) return util.format("<Player#%s>", this.socketID);
		return "<Player>";
	}

	get socketID(){
		return this._client ? this._client.id : null;
	}

	get mob(){
		return this._mob;
	}

	set mob(mob){
		if(this._mob === mob) return;

		let omob;
		if(this._mob) {
			this.logout();
			omob = this._mob;
			this._mob = null;
		}

		if(omob) {
			omob.player = null;
		}

		//		if(mob && mob instanceof Mob){
		if(mob){
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
			let callback = this._callback;
			this._callback = null;
			callback.call(this, input);

		// command processing
		} else if(this.mob) {
			let result = CommandHandler.processCommand(this.mob, input);
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

	joinChannels(){
		for(let channel of ChannelManager.channels){
			this.joinChannel(channel);
		}
	}

	leaveChannels(){
		// this is annoying and gross
		let channel = this._channels[0];
		while(channel) {
			this.leaveChannel(channel);
			channel = this._channels[0];
		}
	}

	joinChannel(channel){
		if(this._channels.indexOf(channel) !== -1) return; // already in channel
		this._channels.push(channel);
		channel.add(this);
	}

	leaveChannel(channel){
		let pos = this._channels.indexOf(channel);
		if(pos === -1) return; // not in channel
		this._channels.splice(pos, 1);
		channel.remove(this);
	}

	/**
	 * Runs after a mob is connected to this Player.
	 */
	login(){
		this.joinChannels();
	}

	/**
	 * Runs before a mob is disconnected from this Player.
	 */
	logout(){
		this.leaveChannels();
		if(this.mob) this.mob.garbage();
	}

	/**
	 * Runs after a client is connected to this Player.
	 * @param {Client} client Client connected to.
	 */
	join(){
		let nanny = new Nanny({player:this});
		nanny.login();
	}

	/**
	 * Runs after a client is disconnected from this Player.
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

		// join client and player
		this.join(client);
	}

	/**
	 * Stop managing the current client.
	 */
	disconnect(){
		Logger.debug(_("disconnected player"));

		let oclient = this._client;
		this._client = null;
		// stop listening for commands?
		// stop listening for disconnection?

		this.leave(oclient);

		/**
		 * Propagates socket disconnect event.
		 * @event Player#disconnect
		 */
		this.emit("disconnect");

		// disconnect from mob as well
		this.mob = null;
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
