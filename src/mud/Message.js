const messages = {
	/** Ability Usage */
	// ability: circle
	AbilityCircle: {
		firstPerson: "You start circling around ${directObject}. [{R-READY{x]",
		secondPerson: "${actor} starts circling around you.",
		thirdPerson: "${actor} starts circling around ${directObject}."
	},

	// ability: maniac
	AbilityManiac: {
		firstPerson: "You start screaming like a maniac and attack. [-READY]",
		thirdPerson: "${actor} starts screaming like a maniac and attacks."
	},

	/** Spell Cast */
	AbilitySpellCast: {
		firstPerson: "You chant a spell: ${ability.chant}. [{R-READY{x]",
		thirdPerson: "${actor} chant a spell: ${ability.chant}."
	},

	/** Attacks */
	AttackAbility: {
		firstPerson: "Your ${ability.display} hits {R${directObject}{x for {R${damage}{x damage. [{${healthCode}${healthPer}%{x]",
		secondPerson: "${actor}'s ${ability.display} hits {Ryou{x for {R${damage}{x damage. [{${healthCode}${healthPer}%{x]",
		thirdPerson: "${actor}'s ${ability.display} hits {R${directObject}{x for {R${damage}{x damage. [{${healthCode}${healthPer}%{x]"
	},

	AttackHitAuto: {
		firstPerson: "You ${action.format.firstPerson} {R${directObject}{x for {R${damage}{x damage. [{${healthCode}${healthPer}%{x]",
		secondPerson: "${actor} ${action.format.thirdPerson} {Ryou{x for {R${damage}{x damage. [{${healthCode}${healthPer}%{x]",
		thirdPerson: "${actor} ${action.format.thirdPerson} {R${directObject}{x for {R${damage}{x damage. [{${healthCode}${healthPer}%{x]"
	},

	AttackHitWeapon: {
		firstPerson: "You ${action.format.firstPerson} {R${directObject}{x with ${weapon} for ${damage} damage. [{${healthCode}${healthPer}%{x]",
		secondPerson: "${actor} ${action.format.thirdPerson} {Ryou{x with ${weapon} for ${damage} damage. [{${healthCode}${healthPer}%{x]",
		thirdPerson: "${actor} ${action.format.thirdPerson} {R${directObject}{x with ${weapon} for ${damage} damage. [{${healthCode}${healthPer}%{x]"
	},

	AttackMiss: {
		firstPerson: "Your hit misses {R${directObject}{x.",
		secondPerson: "${actor}'s hit misses {Ryou{x.",
		thirdPerson: "${actor}'s hit misses {R${directObject}{x."
	},

	/** Combat Messages */
	DeathCry: {
		firstPerson: "{RYou hit the ground, dead.{x",
		thirdPerson: "{R${actor} hits the ground, dead.{x"
	}
};

module.exports = messages;
