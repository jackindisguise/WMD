// node includes
var EventEmitter = require("events");

// local includes
//var _ = require("../../i18n");
//var Logger = require("../util/Logger");
var Server = require("../io/Server");
var Player = require("../io/Player");
var json = require("../../package.json");

/**
 * MUD handler.
 */
class MUD extends EventEmitter{
	constructor(){
		super();
		this._players = [];
	}

	/**
	 * Shortcut for package.json's "name" value.
	 */
	get name(){
		return json.name;
	}

	/**
	 * Shortcut for package.json's "version" value.
	 */
	get version(){
		return json.version;
	}

	/**
	 * The players connected to this MUD.
	 */
	get players(){
		return this._players;
	}

	/**
	 * Start any vital MUD processes, including the server.
	 * @param {int} port
	 */
	start(port){
		Server.open(port, function(){
			// start listening for new client connections
			Server.on("connect", function(client){
				this.connect(client);
			}.bind(this));
		}.bind(this));
	}

	/**
	 * Stop the MUD processes.
	 */
	stop(){
		Server.close();
	}

	/**
	 * Connect a new MUDClient.
	 */
	connect(client){
		var player = new Player({client:client});
		this._players.push(player);

		// start listening for disconnect event
		player.once("disconnect", function(){
			this.disconnect(player);
		}.bind(this));

		/**
		 * @event MUD#connect
		 * @param {Player} player
		 */
		this.emit("connect", player);
	}

	/**
	 * Disconnect a player.
	 */
	disconnect(player){
		var pos = this._players.indexOf(player);
		if(pos === -1) return;

		/**
		 * @event MUD#disconnect
		 * @param {Player} player
		 */
		this.emit("disconnect", player);
	}
}

module.exports = new MUD();
