// node includes
const EventEmitter = require("events");

// local includes
require("../../lib/String");
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const MessageCategory = require("../../etc/MessageCategory");
const TelnetCommand = require("../../etc/TelnetCommand");
const TelnetProtocol = require("../../etc/TelnetProtocol");
const TelnetEnvironment = require("../../etc/TelnetEnvironment");

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
		// split input lines
		let lines = input.split("\r\n");
		let processed = [];

		// process IAC messages here
		for(let i=0;i<lines.length;i++) {
			let line = lines[i];
			line = this.processTelnet(line);
			processed.push(line);
		}

		// pop non-command
		if(processed[processed.length-1] === "") lines.pop(); // funnel this to _incomplete later

		// if there was no linebreak
		if(processed.length === 0) return;
	
		// client echoes manually
		let mEcho = true; // client manually echoes
		if(mEcho) this._messageCategory = null; // if manual echo, don't print linebreak

		/**
		 * @event Client#command
		 * @param {String} command
		 */
		for(let line of lines) this.emit("command", line);
	}

	telnet(){
		let commands = [];
		for(let i=0;i<arguments.length;i++) commands.push(String.fromCharCode(arguments[i]));
		this._socket.write(commands.join(""), "binary");
	}

	processTelnet(line){
		let pos = line.indexOf(String.fromCharCode(TelnetCommand.IAC)); // start of command
		let end; // end of command
		let sub; // subnegotiation body
		while(pos !== -1){
			let command = line.charCodeAt(pos+1);
			switch(command){
			case TelnetCommand.WILL: this.telnetOnWILL(line.charCodeAt(pos+2)); end = pos+3; break;
			case TelnetCommand.WONT: this.telnetOnWONT(line.charCodeAt(pos+2)); end = pos+3; break;
			case TelnetCommand.DO: this.telnetOnDO(line.charCodeAt(pos+2)); end = pos+3; break;
			case TelnetCommand.DONT: this.telnetOnDONT(line.charCodeAt(pos+2)); end = pos+3; break;
			case TelnetCommand.SB:
				end = line.indexOf(String.fromCharCode(TelnetCommand.IAC, TelnetCommand.SE), pos);
				if(end === -1) {
					// bad telnet subnegotiation command.
					end = pos+1;
					break;
				}

				sub = line.slice(pos+2, end);
				// do subnegotiation here
				this.telnetOnSB(sub);
				end += 3; // move past IAC SE
			}

			line = line.slice(0,pos) + line.slice(end);
			pos = line.indexOf(String.fromCharCode(TelnetCommand.IAC));
		}

		return line;
	}

	telnetOnWILL(protocol){
		switch(protocol){
		case TelnetProtocol.TTYPE:
			this.telnet(TelnetCommand.IAC, TelnetCommand.SB, TelnetProtocol.TTYPE, TelnetEnvironment.SEND, TelnetCommand.IAC, TelnetCommand.SE);
			break;
		}
	}

	telnetOnWONT(protocol){

	}

	telnetOnDO(protocol){

	}

	telnetOnDONT(protocol){

	}

	telnetOnSB(negotiation){
		let protocol = negotiation.charCodeAt(0);
		let command = negotiation.charCodeAt(1);
		if(protocol === TelnetProtocol.TTYPE && command === TelnetEnvironment.IS){
//			let ttype = negotiation.slice(2);
		}
	}

	/**
	 * Sends a categorized message.
	 * @param {string} message
	 */
	sendMessage(message, category){
		if(category) {
			if(this._messageCategory != null && this._messageCategory !== category) this._socket.write("\r\n");
			this._messageCategory = category;
		}

		// colorize for telnet
		message = message.colorize("telnet");

		// write to socket
		this._socket.write(message+"\r\n");
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
		socket.setEncoding("binary");

		// start listening for commands
		socket.on("data", function(input){
			this.process(input);
		}.bind(this));

		// start listening for disconnects
		socket.once("close", function(){
			this.disconnect();
		}.bind(this));

		// test
		this.telnet(TelnetCommand.IAC, TelnetCommand.DO, TelnetProtocol.TTYPE);
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
		this._socket.destroy();
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
