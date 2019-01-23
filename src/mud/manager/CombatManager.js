// node includes
let util = require("util");

// local includes
let MessageCategory = require("../../etc/MessageCategory");

// local variables
const interval = 3000;
let combatants = [];

class CombatManager{
	static get combatants(){
		return combatants;
	}

	static get roundID(){
		return Math.floor(Date.now() / interval);
	}

	static get category(){
		return util.format("%s#%d", MessageCategory.COMBAT, CombatManager.roundID);
	}
}

module.exports = CombatManager;
