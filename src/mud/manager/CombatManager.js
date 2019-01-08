const delayPerRound = 3000;
let combatants = [];
let loopID = null;

class CombatManager{
	static get combatants(){
		return combatants;
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
