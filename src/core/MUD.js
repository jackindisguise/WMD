// node includes
var EventEmitter = require("events");

// local includes
var _ = require("../../i18n");
var Logger = require("../util/Logger");
var MUDServer = require("../io/MUDServer");
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
		var mud = this;
		MUDServer.open(80, function(){
			// start listening for new client connections
			MUDServer.on("connect", function(client){
				mud.connect(client);
			});
		});
	}

	/**
	 * Stop the MUD processes.
	 */
	stop(){
		MUDServer.close();
	}

	/**
	 * Connect a new MUDClient.
	 */
	connect(client){
		var player = new Player(client);
		this._players.push(player);

		// start listening for disconnect event
		var mud = this;
		player.once("disconnect", function(){
			mud.disconnect(player);
		});

		/**
		 * @event MUD#connect
		 * @param {Player} player
		 */
		mud.emit("connect", player);
	}

	/**
	 * Disconnect a player.
	 */
	disconnect(player){
		var pos = _players.indexOf(player);
		if(pos == -1) return;

		/**
		 * @event MUD#disconnect
		 * @param {Player} player
		 */
		this.emit("disconnect", player);
	}
};

module.exports = new MUD();
