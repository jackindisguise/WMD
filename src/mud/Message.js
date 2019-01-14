const messages = {
	/** Ability Usage */
	// ability: circle
	AbilityCircle: {
		firstPerson: "You start circling around ${directObject}.",
		secondPerson: "${actor} starts circling around you.",
		thirdPerson: "${actor} starts circling around ${directObject}."
	},

	// ability: maniac
	AbilityManiac: {
		firstPerson: "{RY{ro{Ru {rs{Rt{ra{Rr{rt {Rs{rc{Rr{re{Ra{rm{Ri{rn{Rg {rl{Ri{rk{Re {ra {Rm{ra{Rn{ri{Ra{rc {Ra{rn{Rd {ra{Rt{rt{Ra{rc{Rk{x.",
		thirdPerson: "{R${actor} {rs{Rt{ra{Rr{rt{Rs {rs{Rc{rr{Re{ra{Rm{ri{Rn{rg {Rl{ri{Rk{re {Ra {rm{Ra{rn{Ri{ra{Rc {ra{Rn{rd {Ra{rt{Rt{ra{Rc{rk{Rs{x."
	},

	/** Spell Cast */
	AbilitySpellCast: {
		firstPerson: "You chant a spell: {Y${ability.chant}{x.",
		thirdPerson: "${actor} chants a spell: {Y${ability.chant}{x."
	},

	/** Attacks */
	AttackAbility: {
		firstPerson: "Your {Y${ability.display}{x hits {R${directObject}{x for {R${damage}{x damage.",
		secondPerson: "${actor}'s {Y${ability.display}{x hits {Ryou{x for {R${damage}{x damage.",
		thirdPerson: "${actor}'s {Y${ability.display}{x hits {R${directObject}{x for {R${damage}{x damage."
	},

	AttackHitAuto: {
		firstPerson: "You ${action.format.firstPerson} {R${directObject}{x for {R${damage}{x damage.",
		secondPerson: "${actor} ${action.format.thirdPerson} {Ryou{x for {R${damage}{x damage.",
		thirdPerson: "${actor} ${action.format.thirdPerson} {R${directObject}{x for {R${damage}{x damage."
	},

	AttackHitWeapon: {
		firstPerson: "You ${action.format.firstPerson} {R${directObject}{x with {Y${weapon}{x for ${damage} damage.",
		secondPerson: "${actor} ${action.format.thirdPerson} {Ryou{x with {Y${weapon}{x for ${damage} damage.",
		thirdPerson: "${actor} ${action.format.thirdPerson} {R${directObject}{x with {Y${weapon}{x for ${damage} damage."
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
	},

	/**
	 * Health percentage suffix.
	 */
	SuffixTargetHealthPercentage: {
		thirdPerson: " [${directObject}: {${healthCode}${healthAfter}/${directObject.maxHealth}{x]"
	},

	/**
	 * Suffix for actions that make you busy.
	 */
	SuffixBusy: {
		firstPerson: " [{R-READY{x]"
	},

	/**
	 * Suffix for actions that make you ready. (which is none)
	 */
	SuffixReady: {
		firstPerson: " [{G+READY{x]"
	}
};

module.exports = messages;
