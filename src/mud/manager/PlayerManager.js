let players = [];

class PlayerManager{
	static get players(){
		return players;
	}

	static add(player){
		if(players.indexOf(player) != -1) return;
		players.push(player);
	}

	static remove(player){
		let pos = players.indexOf(player);
		if(pos == -1) return;
		players.splice(pos, 1);
	}

	/**
	 * Retreive a player based on its mob's keywords.
	 * @param {string} name 
	 */
	static getPlayerByName(name){
		for(let player of players){
			if(!player.mob) continue;
			if(player.mob.matchKeywords(name)) return player;
		}
	}
}

module.exports = PlayerManager;
