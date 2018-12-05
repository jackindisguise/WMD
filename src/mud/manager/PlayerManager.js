var Player = require("../io/Player");

var _players = [];

class PlayerManager{
	static get players(){
		return _players;
	}

	/**
	 * Retreive a player based on its mob's keywords.
	 * @param {string} name 
	 */
	static getPlayerByName(name){
		for(var player of _players){
			if(!player.mob) continue;
			if(player.mob.matchKeywords(name)) return player;
		}
	}

	static connect(client){
		var player = new Player({client:client});
		_players.push(player);
		return player;
	}

	static disconnect(player){
		var pos = _players.indexOf(player);
		if(pos == -1) return;
		_players.splice(pos, 1);
	}
}

module.exports = PlayerManager;