var _players = [];

class PlayerManager{
	static get players(){
		return _players;
	}

	static add(player){
		if(_players.indexOf(player) != -1) return;
		_players.push(player);
	}

	static remove(player){
		var pos = _players.indexOf(player);
		if(pos == -1) return;
		_players.splice(pos, 1);
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
}

module.exports = PlayerManager;
