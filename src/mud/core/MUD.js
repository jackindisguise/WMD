// local includes
const _ = require("../../../i18n");
const Player = require("../io/Player");
const PlayerManager = require("../manager/PlayerManager");
const TimeManager = require("../manager/TimeManager");
const Logger = require("../../util/Logger");
const Server = require("../io/Server");

// local variables
let server = new Server();

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
		server.open(port, function(){
			Logger.info(_("Server started on port %d", port));

			// start listening for new client connections
			server.on("connect", function(client){
				MUD.connect(client);
			});

			// start time manager
			TimeManager.start();

			callback();
		});
	}

	/**
	 * Stop the MUD processes.
	 */
	static stop(){
		server.close();
		TimeManager.stop();
	}

	/**
	 * Connect a new MUDClient.
	 */
	static connect(client){
		let player = new Player({client:client});
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
