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
		if(combatants.indexOf(mob) != -1) return;
		combatants.push(mob);
		if(loopID==null) CombatManager.run();
	}

	static remove(mob){
		var pos = combatants.indexOf(mob);
		if(pos == -1) return;
		combatants.splice(pos, 1);
	}

	static round(){
		var oCombatants = combatants;
		combatants = [];
		for(var combatant of oCombatants){
			combatant.combatRound();
			if(combatant.fighting) combatants.push(combatant);
		}

		loopID = null;
		if(combatants.length) CombatManager.run();
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
