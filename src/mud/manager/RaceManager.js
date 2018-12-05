require("../../lib/Array");

var _races = [];

class RaceManager{
	static get races(){
		return _races;
	}

	static add(race){
		if(_races.indexOf(race) != -1) return;
		_races.push(race);
	}

	static remove(race){
		var pos = _races.indexOf(race);
		if(pos == -1) return;
		_races.splice(pos, 1);
	}

	/**
	 * Get race by ID;
	 * @param {number} id 
	 */
	static getRaceByID(id){
		for(var race of _races){
			if(race.id === id) return race;
		}
	}

	/**
	 * Get race by display name.
	 * @param {string} name 
	 */
	static getRaceByName(name){
		for(var race of _races){
			if(race.display === name) return race;
		}
	}
}

module.exports = RaceManager;
