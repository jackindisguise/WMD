const DamageType = require("./DamageType");

const CombatActions = {
	BASH:{
		type:DamageType.BASH,
		format:{
			firstPerson: "bash",
			thirdPerson: "bashes"
		}
	},

	PUNCH:{
		type:DamageType.BASH,
		format:{
			firstPerson: "punch",
			thirdPerson: "punches"
		}
	},

	SLASH:{
		type:DamageType.SLASH,
		format:{
			firstPerson: "slash",
			thirdPerson: "slashes"
		}
	},

	STAB:{
		type:DamageType.PIERCE,
		format:{
			firstPerson: "stab",
			thirdPerson: "stabs"
		}
	},

	ZAP:{
		type:DamageType.MAGICAL,
		format:{
			firstPerson: "zap",
			thirdPerson: "zaps"
		}
	}
};

module.exports = CombatActions;
