require("../../lib/Array");

/**
 * @type {Race[]}
 */
let races = [];

class RaceManager{
	/**
	 * @returns {Race[]}
	 */
	static get races(){
		return races;
	}

	/**
	 * @returns {Race[]}
	 */
	static get selectable(){
		let selectable = [];
		for(let race of races) if(race.selectable) selectable.push(race);
		return selectable;
	}

	static add(race){
		if(races.indexOf(race) !== -1) return;
		races.push(race);
	}

	static remove(race){
		let pos = races.indexOf(race);
		if(pos === -1) return;
		races.splice(pos, 1);
	}

	/**
	 * Get race by name.
	 * @param {string} name 
	 */
	static getRaceByName(name){
		for(let race of races){
			if(race.name === name) return race;
		}
	}
}

module.exports = RaceManager;
