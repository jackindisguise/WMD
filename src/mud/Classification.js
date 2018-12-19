/**
 * The basic classification system for races and classes.
 */
class Classification{
    getToNextLevelByLevel(level){
        return this.toNextLevelBase + (this.toNextLevelPerLevel*Math.max(0,level-1));
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

    getDefenseByLevel(level){
        return this.defenseBase + (this.defensePerLevel*Math.max(0,level-1));
    }

    getVitalityByLevel(level){
        return this.vitalityBase + (this.vitalityPerLevel*Math.max(0,level-1));
    }

    getMagicPowerByLevel(level){
        return this.magicPowerBase + (this.magicPowerPerLevel*Math.max(0,level-1));
    }

    getResilienceByLevel(level){
        return this.resilienceBase + (this.resiliencePerLevel*Math.max(0,level-1));
    }

    getWisdomByLevel(level){
        return this.wisdomBase + (this.wisdomPerLevel*Math.max(0,level-1));
    }

    getSpeedByLevel(level){
        return this.speedBase + (this.speedPerLevel*Math.max(0,level-1));
    }

    getEvasionByLevel(level){
        return this.evasionBase + (this.evasionPerLevel*Math.max(0,level-1));
    }

    getStaminaByLevel(level){
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
 * Unique ID for this classification.
 * @type {number}
 */
Classification.prototype.id = 0;

/**
 * Internal name for this classification.
 * @type {string}
 */
Classification.prototype.name = "unknown";

/**
 * Display name for this classification.
 * @type {string}
 */
Classification.prototype.display = "unknown";

/**
 * Keyword for referencing this classification.
 * @type {string}
 */
Classification.prototype.keywords = "unknown";

/**
 * A simple description for this classification.
 * @type {string}
 */
Classification.prototype.description = "Nobody knows what this is.";

// progression stats
Classification.prototype.toNextLevelBase = 0;
Classification.prototype.toNextLevelPerLevel = 0;

// base primary attributes
Classification.prototype.strengthBase = 0;
Classification.prototype.intelligenceBase = 0;
Classification.prototype.agilityBase = 0;

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
Classification.prototype.strengthPerLevel = 0;
Classification.prototype.intelligencePerLevel = 0;
Classification.prototype.agilityPerLevel = 0;

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
