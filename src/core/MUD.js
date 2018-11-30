// node includes
var EventEmitter = require("events");
var fs = require("fs");

// local includes
var _ = require("../../i18n");
var Logger = require("../util/Logger");
var Database = require("./Database");
var Server = require("../io/Server");
var Player = require("./Player");
var _package = require("../../package.json");

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
		return _package.name;
	}

	/**
	 * Shortcut for package.json's "version" value.
	 */
	get version(){
		return _package.version;
	}

	/**
	 * The players connected to this MUD.
	 */
	get players(){
		return this._players;
	}

	/**
	 * Retreive a player based on its keywords.
	 * @param {string} name 
	 */
	getPlayerByName(name){
		for(var player of this._players){
			if(!player.mob) continue;
			if(player.mob.matchKeywords(name)) return player;
		}
	}

	/**
	 * Start any vital MUD processes, including the server.
	 * @param {int} port
	 * @param {function} callback
	 */
	start(port, callback){
		Database.load(function(){
			Server.open(port, function(){
				Logger.info(_("Server started on port %s", port));
				// start listening for new client connections
				Server.on("connect", function(client){
					this.connect(client);
				}.bind(this));

				if(callback) callback();
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
		return player;
	}

	/**
	 * Disconnect a player.
	 */
	disconnect(player){
		var pos = this._players.indexOf(player);
		if(pos === -1) return;
		this._players.splice(pos, 1);

		/**
		 * @event MUD#disconnect
		 * @param {Player} player
		 */
		this.emit("disconnect", player);
	}
}

module.exports = new MUD();
