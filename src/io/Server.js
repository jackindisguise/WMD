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

	get clients(){
		return this._clients;
	}

	/**
	 * Open a port and begin listening for clients.
	 * @param {int} port
	 * @param {Function} callback
	 */
	open(port, callback){
		var _server = this;

		// start server
		web.server.listen(port, function(){
			if(callback) callback(web, _server);

			// start listening for new sockets
			web.io.on("connection", function(socket){
				_server.connect(socket);
			});
		});
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
		var _server = this;
		mudclient.once("disconnect", function(){
			_server.disconnect(mudclient);
		});
	}

	/**
	 * Stop managing a client.
	 * @param {MUDClient} mudclient
	 */
	disconnect(mudclient){
		var pos = this.clients.indexOf(mudclient);
		this.clients.splice(pos, 1);
		/**
		 * Propagates client disconnect event.
		 * @event MUDServer#disconnect
		 * @param {MUDclient} mudclient
		 */
		this.emit("disconnect", mudclient);
	}
}

module.exports = new MUDServer();
