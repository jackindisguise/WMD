const messages = {
	/** Ability Usage */
	// ability: circle
	AbilityCircle: {
		firstPerson: "You start circling around ${directObject.article}{R${directObject}{x.",
		secondPerson: "${actor.long} starts circling around you.",
		thirdPerson: "${actor.long} starts circling around ${directObject.article}{R${directObject}{x."
	},

	// ability: maniac
	AbilityManiac: {
		firstPerson: "{RYou flail around like a maniac.{x",
		thirdPerson: "{R${actor.article}${actor} flails around like a maniac.{x"
	},

	// ability: bash
	AbilityBash: {
		firstPerson: "You bash the fuck out of ${directObject.article}{R${directObject}{x.",
		secondPerson: "${actor.long} bashes the fuck out of {Ryou{x.",
		thirdPerson: "${actor.long} bashes the fuck out of ${directObject.article}{R${directObject}{x."
	},

	/** Spell Cast */
	AbilitySpellCast: {
		firstPerson: "You chant a spell: {Y${ability.chant}{x.",
		thirdPerson: "${actor.long} chants a spell: {Y${ability.chant}{x."
	},

	/** Prayer */
	AbilityPray: {
		firstPerson: "You chant a prayer: {Y${ability.display}{x.",
		thirdPerson: "${actor.long} chants a prayer: {Y${ability.display}{x."
	},

	/** Attacks */
	AttackAbility: {
		firstPerson: "Your {Y${ability.display}{x hits ${directObject.article}{R${directObject}{x.",
		secondPerson: "${actor.long}'s {Y${ability.display}{x hits {Ryou{x.",
		thirdPerson: "${actor.long}'s {Y${ability.display}{x hits ${directObject.article}{R${directObject}{x."
	},

	AttackHitAuto: {
		firstPerson: "You ${action.format.firstPerson} ${directObject.article}{R${directObject}{x.",
		secondPerson: "${actor.long} ${action.format.thirdPerson} you.",
		thirdPerson: "${actor.long} ${action.format.thirdPerson} ${directObject.article}{R${directObject}{x."
	},

	AttackHitWeapon: {
		firstPerson: "You ${action.format.firstPerson} ${directObject.article}{R${directObject}{x with {Y${weapon}{x.",
		secondPerson: "${actor.long} ${action.format.thirdPerson} you with {Y${weapon}{x.",
		thirdPerson: "${actor.long} ${action.format.thirdPerson} ${directObject.article}{R${directObject}{x with {Y${weapon}{x."
	},

	AttackMiss: {
		firstPerson: "Your hit misses ${directObject.article}{R${directObject}{x.",
		secondPerson: "${actor.long}'s hit misses you.",
		thirdPerson: "${actor.long}'s hit misses ${directObject.article}{R${directObject}{x."
	},

	/** Attack damage suffix. */
	AttackDamageSuffix: {
		firstPerson: " {R-${damage} HP{x [Opponent: {${healthCode}${healthFormatted}{x]",
		secondPerson: " {R-${damage} HP{x [You: {${healthCode}${healthFormatted}{x]"
	},

	/**
	 * Heal message.
	 */
	HealAbility: {
		firstPerson: "Your {Y${ability.display} {xheals {G${directObject.article}{R${directObject}{x for {G${heal} {xhealth.",
		secondPerson: "${actor.long}'s {Y${ability.display} {xheals {Gyou {xfor {G${heal} {xhealth.",
		thirdPerson: "${actor.long} {Y${ability.display} {xheals {G${directObject.article}{R${directObject} {xfor {G${heal} {xhealth."
	},

	HealAbilitySelf: {
		firstPerson: "Your {Y${ability.display} {xheals {Gyou{x.",
		thirdPerson: "${actor.long} {Y${ability.display} {xheals {G${directObject.article}{R${directObject}{x."
	},

	HealSuffix: {
		firstPerson: " {G+${heal}{x [Them: {${healthCode}${healthFormatted}{x]",
		secondPerson: " {G+${heal}{x [You: {${healthCode}${healthFormatted}{x]"
	},

	/** Combat Messages */
	DeathCry: {
		firstPerson: "{RYou hit the ground, dead.{x",
		thirdPerson: "{R${actor.long} hits the ground, dead.{x"
	},

	/**
	 * Experience gain suffix.
	 */
	Kill: {
		firstPerson: "{RYou killed ${directObject.long}.{x"
	},

	GainExperienceSuffix: {
		firstPerson: " {C+${experience} EXP{x [{c${experienceFormatted}{x]"
	},

	/**
	 * Health percentage suffix.
	 */
	TargetHealthPercentageSuffix: {
		firstPerson: " [Them: {${healthCode}${healthFormatted}{x]",
		secondPerson: " [You: {${healthCode}${healthFormatted}{x]"
	},

	ActorHealthPercentageSuffix: {
		thirdPerson: " [{${healthCode}${healthFormatted}{x]"
	},

	/**
	 * Regen message.
	 */
	Regen: {
		firstPerson: "You feel better."
	},

	/**
	 * Regen health suffix.
	 */
	ActorRegenHealthSuffix: {
		thirdPerson: " {G+${health} {RHP{x [{R${healthFormatted}{x]"
	},

	/**
	 * Regen energy suffix.
	 */
	ActorRegenEnergySuffix: {
		thirdPerson: " {G+${energy} {YEP{x [{Y${energyFormatted}{x]"
	},

	/**
	 * Regen health suffix.
	 */
	ActorRegenManaSuffix: {
		thirdPerson: " {G+${mana} {CMP{x [{C${manaFormatted}{x]"
	},

	/**
	 * Too busy to act message.
	 */
	BusyPrefix: {
		thirdPerson: "{R<<{x"
	},

	BusySuffix: {
		thirdPerson: "{R>>{x"
	},

	/**
	 * Ready to act message.
	 */
	Ready:{
		firstPerson: "You regain your balance."
	},

	ReadyPrefix: {
		thirdPerson: "{G<<{x"
	},

	ReadySuffix: {
		thirdPerson: "{G>>{x"
	},

	/**
	 * Expend mana.
	 */
	ExpendMana: {
		firstPerson: "You expend ${mana} mana."
	},

	ExpendManaSuffix: {
		firstPerson: " {C-${mana} MP{x [{C${manaFormatted}{x]"
	},

	/**
	 * Expend energy.
	 */
	ExpendEnergySuffix: {
		firstPerson: " {Y-${energy} EP{x [{Y${energyFormatted}{x]"
	},

	ExpendEnergy: {
		firstPerson: "You expend ${energy} energy."
	},

	EffectApplyArmor: {
		firstPerson: "You are encased in a magic shell.",
		thirdPerson: "${actor.long} is encased in a magic shell."
	},

	EffectExpireArmor: {
		firstPerson: "Your magic shell crumbles away.",
		thirdPerson: "${actor.long}'s magic shell crumbles away."
	}
};

module.exports = messages;
