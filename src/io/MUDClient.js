// node includes
var EventEmitter = require("events");

// local includes
var _ = require("../../i18n");
var Logger = require("../util/Logger");

/**
 * Handles low level MUD client.
 */
class MUDClient extends EventEmitter {
	constructor(socket){
		super();
		this._socket = null;
		if(socket) this.connect(socket);
	}

	/**
	 * Process command input and then fire appropriately.
	 * @param {string} input
	 */
	process(input){
		/**
		 * @event MUDClient#command
		 * @param {String} command
		 */
		this.emit("command", input);
	}

	/**
	 * Send a line of text to the client.
	 * @param {string} line
	 */
	sendLine(line){
		this._socket.emit("message", line, Date.now());
	}

	/**
	 * Start managing a socket.
	 * @param {Object} socket A socket stream.
	 */
	connect(socket){
		Logger.verbose(_("connected client"));
		this._socket = socket;

		// start listening for commands
		var client = this;
		socket.on("command", function(input){
			client.process(input);
		});

		// start listening for disconnects
		socket.once("disconnect", function(){
			client.disconnect();
		});
	}

	/**
	 * Stop managing a socket.
	 */
	disconnect(){
		Logger.verbose(_("disconnected client"));
		this.emit("disconnect");
		this._socket = null;
	}
};

module.exports = MUDClient;
