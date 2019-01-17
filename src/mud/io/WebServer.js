// node includes
const EventEmitter = require("events");

// local includes
const Web = require("./Web");
const Client = require("./WebClient");

/**
 * Handles low level MUD server.
 */
class Server extends EventEmitter {
	constructor(){
		super();
		this._clients = [];
	}

	/**
	 * Open a port and begin listening for clients.
	 * @param {number} port
	 * @param {function} callback
	 */
	open(port, callback){
		// start server
		Web.server.listen(port, function(){
			if(callback) callback(Web, this);

			// start listening for new sockets
			Web.io.on("connection", function(socket){
				this.connect(socket);
			}.bind(this));
		}.bind(this));
	}

	/**
	 * Close the server.
	 */
	close(){
		Web.server.close();
	}

	/**
	 * Start managing a new socket.
	 * @param {Object} socket A socket stream.
	 */
	connect(socket){
		let mudclient = new Client({socket:socket});
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
