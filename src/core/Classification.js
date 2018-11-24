/**
 * The basic classification system for races and classes.
 */
class Classification{
    constructor(){
        /**
         * Unique ID for this classification.
         * @type {number}
         */
        this.id = 0;
    }

    getStrengthByLevel(level){
        return this.strengthBase + (this.strengthPerLevel*Math.max(0,level-1));
    }

    getIntelligenceByLevel(level){
        return this.intelligenceBase + (this.intelligencePerLevel*Math.max(0,level-1));
    }

    getAgilityByLevel(level){
        return this.agilityBase + (this.agilityPerLevel*Math.max(0,level-1));
    }

    getAttackPowerByLevel(level){
        return this.attackPowerBase + (this.attackPowerPerLevel*Math.max(0,level-1));
    }

    getDefensePerLevel(level){
        return this.defenseBase + (this.defensePerLevel*Math.max(0,level-1));
    }

    getVitalityPerLevel(level){
        return this.vitalityBase + (this.vitalityPerLevel*Math.max(0,level-1));
    }

    getMagicPowerPerLevel(level){
        return this.magicPowerBase + (this.magicPowerPerLevel*Math.max(0,level-1));
    }

    getResiliencePerLevel(level){
        return this.resilienceBase + (this.resiliencePerLevel*Math.max(0,level-1));
    }

    getWisdomPerLevel(level){
        return this.wisdomBase + (this.wisdomPerLevel*Math.max(0,level-1));
    }

    getSpeedPerLevel(level){
        return this.speedBase + (this.speedPerLevel*Math.max(0,level-1));
    }

    getEvasionPerLevel(level){
        return this.evasionBase + (this.evasionPerLevel*Math.max(0,level-1));
    }

    getStaminaPerLevel(level){
        return this.staminaBase + (this.staminaPerLevel*Math.max(0,level-1));
    }

    getHealthByLevel(level){
        return this.healthBase + (this.healthPerLevel*Math.max(0,level-1));
    }

    getManaByLevel(level){
        return this.manaBase + (this.manaPerLevel*Math.max(0,level-1));
    }

    getEnergyByLevel(level){
        return this.energyBase + (this.energyPerLevel*Math.max(0,level-1));
    }
}

/**
 * Keyword for referencing this classification.
 * @type {string}
 */
Classification.prototype.keywords = "unknown";

/**
 * Display string for this classification.
 * @type {string}
 */
Classification.prototype.display = "Unknown";

// progression stats
Classification.prototype.toNextLevelBase = 100;
Classification.prototype.toNextLevelPerLevel = 0;

// base primary attributes
Classification.prototype.strengthBase = 10;
Classification.prototype.intelligenceBase = 10;
Classification.prototype.agilityBase = 10;

// base secondary attributes
Classification.prototype.attackPowerBase = 0;
Classification.prototype.defenseBase = 0;
Classification.prototype.vitalityBase = 0;
Classification.prototype.magicPowerBase = 0;
Classification.prototype.resilienceBase = 0;
Classification.prototype.wisdomBase = 0;
Classification.prototype.speedBase = 0;
Classification.prototype.evasionBase = 0;
Classification.prototype.staminaBase = 0;

// base stats
Classification.prototype.healthBase = 0;
Classification.prototype.manaBase = 0;
Classification.prototype.energyBase = 0;

// primary attributes per level
Classification.prototype.strengthPerLevel = 1;
Classification.prototype.intelligencePerLevel = 1;
Classification.prototype.agilityPerLevel = 1;

// secondary attributes per level
Classification.prototype.attackPowerPerLevel = 0;
Classification.prototype.defensePerLevel = 0;
Classification.prototype.vitalityPerLevel = 0;
Classification.prototype.magicPowerPerLevel = 0;
Classification.prototype.resiliencePerLevel = 0;
Classification.prototype.wisdomPerLevel = 0;
Classification.prototype.speedPerLevel = 0;
Classification.prototype.evasionPerLevel = 0;
Classification.prototype.staminaPerLevel = 0;

// stats per level
Classification.prototype.healthPerLevel = 0;
Classification.prototype.manaPerLevel = 0;
Classification.prototype.energyPerLevel = 0;

module.exports = Classification;
