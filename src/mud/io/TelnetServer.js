// node includes
const EventEmitter = require("events");
const net = require("net");

// local includes
const TelnetClient = require("./TelnetClient");

/**
 * Handles low level MUD server.
 */
class Server extends EventEmitter {
	constructor(){
		super();
		this._netserver = null;
		this._clients = [];
	}

	/**
	 * Open a port and begin listening for clients.
	 * @param {number} port
	 * @param {function} callback
	 */
	open(port, callback){
		// start server
		this._netServer = net.createServer(function(socket){
			this.connect(socket);
		}.bind(this));

		this._netServer.listen(port, callback);
	}

	/**
	 * Close the server.
	 */
	close(){
		this._netServer.close();
	}

	/**
	 * Start managing a new socket.
	 * @param {Object} socket A socket stream.
	 */
	connect(socket){
		let mudclient = new TelnetClient({socket:socket});
		this._clients.push(mudclient);
		/**
		 * @event Server#connect
		 * @param {Client} mudclient
		 */
		this.emit("connect", mudclient);

		// wait for disconnect event from mudclient
		mudclient.once("disconnect", function(){
			this.disconnect(mudclient);
		}.bind(this));
	}

	/**
	 * Stop managing a client.
	 * @param {Client} mudclient
	 */
	disconnect(mudclient){
		let pos = this._clients.indexOf(mudclient);
		this._clients.splice(pos, 1);
		/**
		 * Propagates client disconnect event.
		 * @event Server#disconnect
		 * @param {Client} mudclient
		 */
		this.emit("disconnect", mudclient);
	}
}

module.exports = Server;
