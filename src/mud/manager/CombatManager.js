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
		combatants.sort(function(a,b){ return a.agility > b.agility; });
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
		var done = [];
		for(var combatant of oCombatants){
			if(done.indexOf(combatant) >= 0) continue; // already done
			if(!combatant.fighting) continue; // no target
			var opponent = combatant.fighting;
			combatant.sendLine("{Y" + " {yCombat Round {Y".center(80, "-") + "{x");
			opponent.sendLine("{Y" + " {yCombat Round {Y".center(80, "-") + "{x");
			combatant.combatRound();
			if(opponent && opponent.fighting == combatant){
				opponent.combatRound();
				done.push(opponent);
				if(opponent.fighting) combatants.push(opponent);
			}

			done.push(combatant);
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
