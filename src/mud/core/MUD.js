// node includes
var EventEmitter = require("events");

// local includes
var _ = require("../../../i18n");
var Player = require("../io/Player");
var PlayerManager = require("../manager/PlayerManager");
var Logger = require("../../util/Logger");
var Server = require("../io/Server");

/**
 * MUD handler.
 */
class MUD{
	/**
	 * Start any vital MUD processes, including the server.
	 * @param {int} port
	 * @param {function} callback
	 */
	static start(port, callback){
		Server.open(port, function(){
			Logger.info(_("Server started on port %d", port));
			// dtart listening for new client connections
			Server.on("connect", function(client){
				MUD.connect(client);
			});

			callback();
		});
	}

	/**
	 * Stop the MUD processes.
	 */
	static stop(){
		Server.close();
	}

	/**
	 * Connect a new MUDClient.
	 */
	static connect(client){
		var player = new Player({client:client});
		PlayerManager.add(player);

		// start listening for disconnect event
		player.once("disconnect", function(){
			MUD.disconnect(player);
		});

		return player;
	}

	/**
	 * Disconnect a player.
	 */
	static disconnect(player){
		PlayerManager.remove(player);
	}
}

module.exports = MUD;
