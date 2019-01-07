require("../../lib/Array");

let races = [];

class RaceManager{
	static get races(){
		return races;
	}

	static add(race){
		if(races.indexOf(race) != -1) return;
		races.push(race);
	}

	static remove(race){
		let pos = races.indexOf(race);
		if(pos == -1) return;
		races.splice(pos, 1);
	}

	/**
	 * Get race by display name.
	 * @param {string} name 
	 */
	static getRaceByName(name){
		for(let race of races){
			if(race.name === name) return race;
		}
	}
}

module.exports = RaceManager;
