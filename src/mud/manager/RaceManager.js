require("../../lib/Array");

var races = [];

class RaceManager{
	static get races(){
		return races;
	}

	static add(race){
		if(races.indexOf(race) != -1) return;
		races.push(race);
	}

	static remove(race){
		var pos = races.indexOf(race);
		if(pos == -1) return;
		races.splice(pos, 1);
	}

	/**
	 * Get race by display name.
	 * @param {string} name 
	 */
	static getRaceByName(name){
		for(var race of races){
			if(race.name === name) return race;
		}
	}
}

module.exports = RaceManager;
