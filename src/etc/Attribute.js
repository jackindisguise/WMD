/**
 * Exposes values for assisting with accessing attributes.
 * @namespace
 */
const Attribute = {
	/**
	 * String literals for accessing attributes directly.
	 * @enum {string}
	 */
	attribute: {
		STRENGTH: "strength",
		ATTACK_POWER: "attackPower",
		DEFENSE: "defense",
		VITALITY: "vitality",
		AGILITY: "agility",
		PRECISION: "precision",
		DEFLECTION: "deflection",
		STAMINA: "stamina",
		INTELLIGENCE: "intelligence",
		MAGIC_POWER: "magicPower",
		RESILIENCE: "resilience",
		WISDOM: "wisdom",
		HEALTH: "health",
		ENERGY: "energy",
		MANA: "mana"
	},

	/**
	 * Sanitized string literals for displaying attributes to users.
	 * @enum {string}
	 */
	display: {
		STRENGTH: "strength",
		ATTACK_POWER: "attack power",
		DEFENSE: "defense",
		VITALITY: "vitality",
		AGILITY: "agility",
		PRECISION: "precision",
		DEFLECTION: "deflection",
		STAMINA: "stamina",
		INTELLIGENCE: "intelligence",
		MAGIC_POWER: "magic power",
		RESILIENCE: "resilience",
		WISDOM: "wisdom",
		HEALTH: "health",
		ENERGY: "energy",
		MANA: "mana"
	}
};

module.exports = Attribute;
