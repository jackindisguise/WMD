// node includes
var EventEmitter = require("events");

// local includes
var _ = require("../../i18n");
var Logger = require("../util/Logger");
var MessageCategory = require("../core/MessageCategory");

/**
 * Handles low level MUD client.
 */
class Client extends EventEmitter {
	/**
	 * Construct a client.
	 * @param {ClientConstructorOptions} options Constructor options.
	 */
	constructor(options){
		super();

		if(options){
			if(options.socket) this.connect(options.socket);
		}
	}

	/**
	 * Socket.IO socket ID.
	 */
	get id(){
		return this._socket ? this._socket.id : null;
	}

	/**
	 * Process command input and then fire appropriately.
	 * @param {string} input Input from the socket.
	 */
	process(input){
		/**
		 * @event Client#command
		 * @param {String} command
		 */
		this.emit("command", input);
	}

	/**
	 * Sends a categorized message.
	 * @param {string} message
	 */
	sendMessage(message, category){
		if(this._socket) this._socket.emit("message", message, category, Date.now());
	}

	/**
	 * Send a line of text to the client.
	 * @param {string} line The line of text to send.
	 */
	sendLine(line){
		this.sendMessage(line, MessageCategory.DEFAULT);
	}

	/**
	 * Start managing a socket.
	 * @param {Object} socket A socket stream.
	 */
	connect(socket){
		Logger.debug(_("connected client"));
		this._socket = socket;

		// start listening for commands
		socket.on("command", function(input){
			this.process(input);
		}.bind(this));

		// start listening for disconnects
		socket.once("disconnect", function(){
			this.disconnect();
		}.bind(this));
	}

	/**
	 * Stop managing a socket.
	 */
	disconnect(){
		Logger.debug(_("disconnected client"));
		/**
		 * Propagates socket disconnect event.
		 * @event Client#disconnect
		 */
		this.emit("disconnect");
		this._socket = null;
	}
}

Client.prototype._socket = null;

module.exports = Client;

/**
 * Sole valid argument for `new Client()`.
 * @typedef {Object} ClientConstructorOptions
 * @property {socket} socket A socket stream.
 */
