// node includes
var EventEmitter = require("events");

// local includes
var web = require("./web");
var MUDClient = require("./Client");

/**
 * Handles low level MUD server.
 */
class MUDServer extends EventEmitter {
	constructor(){
		super();
		this._clients = [];
	}

	/**
	 * Open a port and begin listening for clients.
	 * @param {int} port
	 * @param {Function} callback
	 */
	open(port, callback){
		// start server
		web.server.listen(port, function(){
			if(callback) callback(web, this);

			// start listening for new sockets
			web.io.on("connection", function(socket){
				this.connect(socket);
			}.bind(this));
		}.bind(this));
	}

	/**
	 * Close the server.
	 */
	close(){
		web.server.close();
	}

	/**
	 * Start managing a new socket.
	 * @param {Object} socket A socket stream.
	 */
	connect(socket){
		var mudclient = new MUDClient({socket:socket});
		this._clients.push(mudclient);
		/**
		 * @event MUDServer#connect
		 * @param {MUDclient} mudclient
		 */
		this.emit("connect", mudclient);

		// wait for disconnect event from mudclient
		mudclient.once("disconnect", function(){
			this.disconnect(mudclient);
		}.bind(this));
	}

	/**
	 * Stop managing a client.
	 * @param {MUDClient} mudclient
	 */
	disconnect(mudclient){
		var pos = this._clients.indexOf(mudclient);
		this._clients.splice(pos, 1);
		/**
		 * Propagates client disconnect event.
		 * @event MUDServer#disconnect
		 * @param {MUDclient} mudclient
		 */
		this.emit("disconnect", mudclient);
	}
}

module.exports = new MUDServer();
