var util = require("util");
var Logger = require("../../util/Logger");

var delayPerRound = 3000;
var combatants = [];
var loopID = null;

class CombatManager{
	static get combatants(){
		return combatants;
	}

	static add(mob){
		if(combatants.indexOf(mob) >= 0) return;
		combatants.push(mob);
		combatants.sort(function(a,b){ return b.agility - a.agility; });
		if(loopID==null) CombatManager.run();
	}

	static remove(mob){
		var pos = combatants.indexOf(mob);
		if(pos == -1) return;
		combatants.splice(pos, 1);
	}

	static round(){
		loopID = null; // clear loop ID
		var oCombatants = combatants;
		combatants = [];
		var done = [];
		for(var combatant of oCombatants){
			if(!combatant.fighting) continue; // no target
			combatant.combatRound();
			if(combatant.fighting) CombatManager.add(combatant);
		}
	}

	static run(){
		var delay = CombatManager.timeTilNextRound();
		loopID = setTimeout(CombatManager.round, delay)
	}

	static timeTilNextRound(){
		return delayPerRound - (Date.now() % delayPerRound);
	}
}

module.exports = CombatManager;
