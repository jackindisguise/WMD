// node includes
var EventEmitter = require("events");

// local includes
var _ = require("../../../i18n");
var _package = require("../../../package.json");
var PlayerManager = require("../manager/PlayerManager");
var Logger = require("../../util/Logger");
var Server = require("../io/Server");

/**
 * MUD handler.
 */
class MUD extends EventEmitter{
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
	 * Start any vital MUD processes, including the server.
	 * @param {int} port
	 * @param {function} callback
	 */
	start(port, callback){
		Server.open(port, function(){
			Logger.info(_("Server started on port %s", port));
			// start listening for new client connections
			Server.on("connect", function(client){
				this.connect(client);
			}.bind(this));

			if(callback) callback();
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
		var player = PlayerManager.connect(client);

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
		PlayerManager.disconnect(player);

		/**
		 * @event MUD#disconnect
		 * @param {Player} player
		 */
		this.emit("disconnect", player);
	}
}

MUD.prototype._map = null;

module.exports = new MUD();
