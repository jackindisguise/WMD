// local includes
const Item = require("./Item");

class Equipment extends Item{
	get strength(){ return this.strengthBonus; }
	get rawStrength(){ return this.strengthBonus; }
	get attackPower(){ return this.attackPowerBonus; }
	get rawAttackPower(){ return this.attackPowerBonus; }
	get defense(){ return this.defenseBonus; }
	get rawDefense(){ return this.defenseBonus; }
	get vitality(){ return this.vitalityBonus; }
	get rawVitality(){ return this.vitalityBonus; }
	get health(){ return this.healthBonus; }
	get rawHealth(){ return this.healthBonus; }
	get agility(){ return this.agilityBonus; }
	get rawAgility(){ return this.agilityBonus; }
	get precision(){ return this.precisionBonus; }
	get rawPrecision(){ return this.precisionBonus; }
	get deflection(){ return this.deflectionBonus; }
	get rawDeflection(){ return this.deflectionBonus; }
	get stamina(){ return this.staminaBonus; }
	get rawStamina(){ return this.staminaBonus; }
	get energy(){ return this.energyBonus; }
	get rawEnergy(){ return this.energyBonus; }
	get intelligence(){ return this.intelligenceBonus; }
	get rawIntelligence(){ return this.intelligenceBonus; }
	get magicPower(){ return this.magicPowerBonus; }
	get rawMagicPower(){ return this.magicPowerBonus; }
	get resilience(){ return this.resilienceBonus; }
	get rawResilience(){ return this.resilienceBonus; }
	get wisdom(){ return this.wisdomBonus; }
	get rawWisdom(){ return this.wisdomBonus; }
	get mana(){ return this.manaBonus; }
	get rawMana(){ return this.manaBonus; }

	__JSONWrite(key, value, json){
		switch(key){
		case "worn":
			if(!value) break;
			json.worn = value.name; // save just the name of the slot
			break;

		default:
			super.__JSONWrite(key, value, json);
			break;
		}
	}
}

Equipment.prototype.level = 1;
Equipment.prototype.strengthBonus = 0;
Equipment.prototype.attackPowerBonus = 0;
Equipment.prototype.defenseBonus = 0;
Equipment.prototype.vitalityBonus = 0;
Equipment.prototype.healthBonus = 0;
Equipment.prototype.agilityBonus = 0;
Equipment.prototype.precisionBonus = 0;
Equipment.prototype.deflectionBonus = 0;
Equipment.prototype.staminaBonus = 0;
Equipment.prototype.energyBonus = 0;
Equipment.prototype.intelligenceBonus = 0;
Equipment.prototype.magicPowerBonus = 0;
Equipment.prototype.resilienceBonus = 0;
Equipment.prototype.wisdomBonus = 0;
Equipment.prototype.manaBonus = 0;
Equipment.prototype.slotType = null;
Equipment.prototype.worn = null;

/** @default "equipment" */
Equipment.prototype.keywords = "equipment";

/** @default "Equipment" */
Equipment.prototype.display = "Equipment";

module.exports = Equipment;
