var attribute = {
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
};

var display = {
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
};

class Attributes{
	static get attribute(){
		return attribute;
	}

	static get display(){
		return display;
	}
}

module.exports = Attributes;
