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

	get strength(){ return 0; }
	get attackPower(){ return 0; }
	get defense(){ return 0; }
	get vitality(){ return 0; }
	get health(){ return 0; }
	get intelligence(){ return 0; }
	get magicPower(){ return 0; }
	get resilience(){ return 0; }
	get wisdom(){ return 0; }
	get mana(){ return 0; }
	get agility(){ return 0; }
	get precision(){ return 0; }
	get deflection(){ return 0; }
	get stamina(){ return 0; }
	get energy(){ return 0; }

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

	apply(affectee, silent){
		this.affectee = affectee;
		if(this.applyMessage && !silent) Communicate.act({
			actor:this.affectee,
			recipients:this.affectee.loc.contents,
			message:this.applyMessage,
			category:MessageCategory.EFFECT
		});

		this.start();
	}

	start(){
		this._startTime = Date.now();
		this._expireID = setTimeout(this.expire.bind(this), this.duration);
	}

	stop(){
		this.duration -= Date.now() - this._startTime;
		clearTimeout(this._expireID);
		this.clear();
	}

	expire(silent){
		if(this.expireMessage && !silent) Communicate.act({
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
		delete this._expireID;
		delete this._startTime;
	}

	__JSONWrite(key, value, json){
		switch(key){
		case "name":
			json.name = value;
			break;

		case "duration":
			json.duration = this._expireID ? this.duration - (Date.now() - this._startTime) : this.duration;
			break;

		default:
			super.__JSONWrite(key, value, json);
			break;
		}
	}
}

/**
 * Name for identifying this effect.
 */
Effect.prototype.name = null;

Effect.prototype._affectee = null;

/**
 * Effect level.
 */
Effect.prototype.level = 1;

Effect.prototype.duration = null;

Effect.prototype.applyMessage = null;

Effect.prototype.expireMessage = null;

module.exports = Effect;
