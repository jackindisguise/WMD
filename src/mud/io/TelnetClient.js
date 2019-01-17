// node includes
const EventEmitter = require("events");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const MessageCategory = require("../../etc/MessageCategory");

/**
 * Handles low level MUD client.
 */
class TelnetClient extends EventEmitter {
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
		let lines = input.split("\r\n");
		if(lines[lines.length-1] === "") lines.pop();
		if(lines.length === 0) return;
	
		// client echoes manually
		if(true) this._messageCategory = null;

		/**
		 * @event Client#command
		 * @param {String} command
		 */
		for(let line of lines) this.emit("command", line);
	}

	/**
	 * Sends a categorized message.
	 * @param {string} message
	 */
	sendMessage(message, category){
		//if(this._socket) this._socket.emit("message", message, category, Date.now());
		if(category) {
			if(this._messageCategory != null && this._messageCategory !== category) this._socket.write("\r\n");
			this._messageCategory = category;
		}

		let TelnetColor = require("../../etc/TelnetColor");
		let colorized = message.replace(/\{(.)/g, function(full, char){
			switch(char){
			case "R": return TelnetColor.C_B_RED;
			case "r": return TelnetColor.C_RED;
			case "G": return TelnetColor.C_B_GREEN;
			case "g": return TelnetColor.C_GREEN;
			case "B": return TelnetColor.C_B_BLUE;
			case "b": return TelnetColor.C_BLUE;
			case "Y": return TelnetColor.C_B_YELLOW;
			case "y": return TelnetColor.C_YELLOW;
			case "P": return TelnetColor.C_B_MAGENTA;
			case "p": return TelnetColor.C_MAGENTA;
			case "C": return TelnetColor.C_B_CYAN;
			case "c": return TelnetColor.C_CYAN;
			case "W": return TelnetColor.C_B_WHITE;
			case "w": return TelnetColor.C_WHITE;
			case "D": return TelnetColor.C_D_GREY;
			case "x":
			default: return TelnetColor.CLEAR;
			}
		});

		this._socket.write(colorized+"\r\n");
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
		socket.setEncoding("ascii");

		// start listening for commands
		socket.on("data", function(input){
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

	quit(){
		this._socket.end();
	}
}

TelnetClient.prototype._socket = null;
TelnetClient.prototype._messageCategory = null;

module.exports = TelnetClient;

/**
 * Sole valid argument for `new Client()`.
 * @typedef {Object} ClientConstructorOptions
 * @property {socket} socket A socket stream.
 */
