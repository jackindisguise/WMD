// node includes
let util = require("util");

// local includes
let MessageCategory = require("../etc/MessageCategory");

// local variables
const delayPerRound = 3000;
let combatants = [];
let loopID = null;
let RID = 0;

class CombatManager{
	static get combatants(){
		return combatants;
	}

	static get RID(){
		return RID;
	}

	static get category(){
		return util.format("%s#%d", MessageCategory.COMBAT, RID);
	}

	static add(mob){
		if(combatants.indexOf(mob) !== -1) return;
		combatants.push(mob);
		combatants.sort(function(a,b){ return b.agility - a.agility; });
		if(loopID==null) CombatManager.run();
	}

	static remove(mob){
		let pos = combatants.indexOf(mob);
		if(pos === -1) return;
		combatants.splice(pos, 1);
	}

	static round(){
		RID++;
		loopID = null; // clear loop ID
		let oCombatants = combatants;
		combatants = [];
		for(let combatant of oCombatants){
			if(!combatant.fighting) continue; // no target
			combatant.combatRound();
			if(combatant.fighting) CombatManager.add(combatant);
		}
	}

	static run(){
		let delay = CombatManager.timeTilNextRound();
		loopID = setTimeout(CombatManager.round, delay);
	}

	static timeTilNextRound(){
		return delayPerRound - (Date.now() % delayPerRound);
	}
}

module.exports = CombatManager;
