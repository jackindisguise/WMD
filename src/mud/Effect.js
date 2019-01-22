const Communicate = require("./Communicate");
const AttributeName = require("../etc/AttributeName");
const MessageCategory = require("../etc/MessageCategory");

class Effect{
	constructor(options){
		if(options){
			if(options.level) this.level = options.level;
			if(options.affectee) this.affectee = options.affectee;
			if(options.duration) this.duration = options.duration;
		}
	}

	set affectee(affectee){
		if(this.affectee === affectee) return;
		let oaffectee = this.affectee;
		this._affectee = null;
	
		if(oaffectee) oaffectee.removeEffect(this);

		if(affectee) {
			this._affectee = affectee;
			affectee.addEffect(this);
		}
	}

	get affectee() {
		return this._affectee;
	}

	get strength(){ return this.strengthBonus; }
	get attackPower(){ return this.attackPowerBonus; }
	get defense(){ return this.defenseBonus; }
	get vitality(){ return this.vitalityBonus; }
	get health(){ return this.healthBonus; }
	get intelligence(){ return this.intelligenceBonus; }
	get magicPower(){ return this.magicPowerBonus; }
	get resilience(){ return this.resilienceBonus; }
	get wisdom(){ return this.wisdomBonus; }
	get mana(){ return this.manaBonus; }
	get agility(){ return this.agilityBonus; }
	get precision(){ return this.precisionBonus; }
	get deflection(){ return this.deflectionBonus; }
	get stamina(){ return this.staminaBonus; }
	get energy(){ return this.energyBonus; }

	getAttributeByName(name){
		switch(name){
		case AttributeName.STRENGTH: return this.strength;
		case AttributeName.ATTACK_POWER: return this.attackPower;
		case AttributeName.DEFENSE: return this.defense;
		case AttributeName.VITALITY: return this.vitality;
		case AttributeName.MAX_HEALTH: return this.health;
		case AttributeName.INTELLIGENCE: return this.intelligence;
		case AttributeName.MAGIC_POWER: return this.magicPower;
		case AttributeName.RESILIENCE: return this.resilience;
		case AttributeName.WISDOM: return this.wisdom;
		case AttributeName.MAX_MANA: return this.mana;
		case AttributeName.AGILITY: return this.agility;
		case AttributeName.PRECISION: return this.precision;
		case AttributeName.DEFLECTION: return this.deflection;
		case AttributeName.STAMINA: return this.stamina;
		case AttributeName.MAX_ENERGY: return this.energy;
		}
	}

	getAttributes(){
		let attributes = {};
		for(let entry in AttributeName){
			let name = AttributeName[entry];
			attributes[name] = this.getAttributeByName(name);
		}

		return attributes;
	}

	apply(affectee){
		this.affectee = affectee;
		if(this.applyMessage) Communicate.act({
			actor:this.affectee,
			recipients:this.affectee.loc.contents,
			message:this.applyMessage,
			category:MessageCategory.EFFECT
		});

		this.start();
	}

	start(){
		this._startTime = Date.now();
		this._id = setTimeout(this.expire.bind(this), this.duration);
	}

	stop(){
		this.duration -= Date.now() - this._startTime;
		clearTimeout(this._id);
		this.clear();
	}

	expire(){
		if(this.expireMessage) Communicate.act({
			actor:this.affectee,
			recipients:this.affectee.loc.contents,
			message:this.expireMessage,
			category:MessageCategory.EFFECT
		});

		// remove this effect :)
		this.affectee = null;
		this.clear();
	}

	clear(){
		delete this._id;
		delete this._startTime;
	}

	__JSONWrite(key, value, json){
		switch(key){
		case "name":
			json.name = value;
			break;

		case "_startTime":
		case "_id":
		case "affectee":
			break;

		default:
			super.__JSONWrite(key, value, json);
			break;
		}
	}
}

/**
 * Effect level.
 */
Effect.prototype.level = 1;

/**
 * Name for identifying this effect.
 */
Effect.prototype.name = null;

Effect.prototype._affectee = null;

Effect.prototype.duration = null;

Effect.prototype.applyMessage = null;

Effect.prototype.expireMessage = null;

// attribute modifiers
Effect.prototype.strengthBonus = 0;
Effect.prototype.attackPowerBonus = 0;
Effect.prototype.defenseBonus = 0;
Effect.prototype.vitalityBonus = 0;
Effect.prototype.healthBonus = 0;
Effect.prototype.agilityBonus = 0;
Effect.prototype.precisionBonus = 0;
Effect.prototype.deflectionBonus = 0;
Effect.prototype.staminaBonus = 0;
Effect.prototype.energyBonus = 0;
Effect.prototype.intelligenceBonus = 0;
Effect.prototype.magicPowerBonus = 0;
Effect.prototype.resilienceBonus = 0;
Effect.prototype.wisdomBonus = 0;
Effect.prototype.manaBonus = 0;

module.exports = Effect;
