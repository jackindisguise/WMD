// node includes
const util = require("util");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const DamageType = require("../etc/DamageType");
const Message = require("../etc/Message");
const CombatAction = require("../etc/CombatAction");
const Direction = require("../etc/Direction");
const MessageCategory = require("../etc/MessageCategory");
const Attribute = require("../etc/Attribute");
const WearLocation = require("../etc/WearLocation");
const WearSlot = require("../etc/WearSlot");
const CombatManager = require("../manager/CombatManager");
const Communicate = require("../Communicate");
const Movable = require("./Movable");
const Tile = require("../map/Tile");
const RaceManager = require("../manager/RaceManager");
const Race = require("../Race");
const ClassManager = require("../manager/ClassManager");
const Class = require("../Class");
const Equipment = require("./Equipment");

/**
 * Represents an animate creature on the map.
 * @extends Movable
 */
class Mob extends Movable{
	/**
	 * Construct a Mob.
	 * @param {MobConstructorOptions} options 
	 */
	constructor(options){
		super(options);
		this.worn = {
			HEAD: null,
			NECK: null,
			SHOULDER: null,
			ARMS: null,
			HANDS: null,
			FINGER_A: null,
			FINGER_B: null,
			TORSO: null,
			WAIST: null,
			LEGS: null,
			FEET: null,
			HAND_OFF: null,
			HAND_PRIMARY: null
		};
	}

	toString(){
		return this.name || super.toString();
	}

	get rawStrength(){
		let strength = 0;
		strength += this._race.getStrengthByLevel(this.level);
		strength += this._class.getStrengthByLevel(this.level);
		return Math.floor(strength);
	}

	get strength(){
		let strength = 0;
		strength += this._race.getStrengthByLevel(this.level);
		strength += this._class.getStrengthByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) strength += eq.strength;
		}
		return Math.floor(strength);
	}

	get rawAttackPower(){
		let attackPower = 0;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		return Math.floor(attackPower);
	}

	get attackPower(){
		let attackPower = this.strength;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) attackPower += eq.attackPower;
		}
		return Math.floor(attackPower);
	}

	get rawDefense(){
		let defense = 0;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		return Math.floor(defense);
	}

	get defense(){
		let defense = this.strength;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) defense += eq.defense;
		}
		return Math.floor(defense);
	}

	get rawVitality(){
		let vitality = 0;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		return Math.floor(vitality);
	}

	get vitality(){
		let vitality = this.strength;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) vitality += eq.vitality;
		}
		return Math.floor(vitality);
	}

	get rawMaxHealth(){
		let health = 0;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		return Math.floor(health);
	}

	get maxHealth(){
		let health = this.vitality * 3;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) health += eq.health;
		}
		return Math.floor(health);
	}

	get rawAgility(){
		let agility = 0;
		agility += this._race.getAgilityByLevel(this.level);
		agility += this._class.getAgilityByLevel(this.level);
		return Math.floor(agility);
	}

	get agility(){
		let agility = 0;
		agility += this._race.getAgilityByLevel(this.level);
		agility += this._class.getAgilityByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) agility += eq.agility;
		}
		return Math.floor(agility);
	}

	get rawPrecision(){
		let precision = 0;
		precision += this._race.getPrecisionByLevel(this.level);
		precision += this._class.getPrecisionByLevel(this.level);
		return Math.floor(precision);
	}

	get precision(){
		let speed = this.agility;
		speed += this._race.getPrecisionByLevel(this.level);
		speed += this._class.getPrecisionByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) speed += eq.precision;
		}
		return Math.floor(speed);
	}

	get rawDeflection(){
		let deflection = 0;
		deflection += this._race.getDeflectionByLevel(this.level);
		deflection += this._class.getDeflectionByLevel(this.level);
		return Math.floor(deflection);
	}

	get deflection(){
		let deflection = this.agility;
		deflection += this._race.getDeflectionByLevel(this.level);
		deflection += this._class.getDeflectionByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) deflection += eq.deflection;
		}
		return Math.floor(deflection);
	}

	get rawStamina(){
		let stamina = 0;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		return Math.floor(stamina);
	}

	get stamina(){
		let stamina = this.agility;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) stamina += eq.stamina;
		}
		return Math.floor(stamina);
	}

	get rawMaxEnergy(){
		let energy = 0;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		return Math.floor(energy);
	}

	get maxEnergy(){
		let energy = this.stamina;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) energy += eq.energy;
		}
		return Math.floor(energy);
	}

	get rawIntelligence(){
		let intelligence = 0;
		intelligence += this._race.getIntelligenceByLevel(this.level);
		intelligence += this._class.getIntelligenceByLevel(this.level);
		return Math.floor(intelligence);
	}

	get intelligence(){
		let intelligence = 0;
		intelligence += this._race.getIntelligenceByLevel(this.level);
		intelligence += this._class.getIntelligenceByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) intelligence += eq.intelligence;
		}
		return Math.floor(intelligence);
	}

	get rawMagicPower(){
		let magicPower = 0;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		return Math.floor(magicPower);
	}

	get magicPower(){
		let magicPower = this.intelligence;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) magicPower += eq.magicPower;
		}
		return Math.floor(magicPower);
	}

	get rawResilience(){
		let resilience = 0;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		return Math.floor(resilience);
	}

	get resilience(){
		let resilience = this.intelligence;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) resilience += eq.resilience;
		}
		return Math.floor(resilience);
	}

	get rawWisdom(){
		let wisdom = 0;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		return Math.floor(wisdom);
	}

	get wisdom(){
		let wisdom = this.intelligence;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) wisdom += eq.wisdom;
		}
		return Math.floor(wisdom);
	}

	get rawMaxMana(){
		let mana = 0;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		return Math.floor(mana);
	}

	get maxMana(){
		let mana = this.wisdom;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		for(let slot in this.worn){
			let eq = this.worn[slot];
			if(eq) mana += eq.mana;
		}
		return Math.floor(mana);
	}

	get toNextLevel(){
		let tnl = 0;
		tnl += this._race.getToNextLevelByLevel(this.level);
		tnl += this._class.getToNextLevelByLevel(this.level);
		return Math.floor(tnl);
	}

	get tnl(){
		return this.toNextLevel;
	}

	get abilities(){
		let abilities = [];
		if(this.race.abilities){
			for(let learn of this.race.abilities){
				if(learn.level > this.level) continue;
				if(abilities.indexOf(learn.ability) !== -1) continue;
				abilities.push(learn.ability);
			}
		}

		if(this.class.abilities){
			for(let learn of this.class.abilities){
				if(learn.level > this.level) continue;
				if(abilities.indexOf(learn.ability) !== -1) continue;
				abilities.push(learn.ability);
			}
		}

		return abilities;
	}

	get player(){
		return this._player;
	}

	set player(player){
		if(this._player === player) return;

		let oplayer;
		if(this._player) {
			this.logout();
			oplayer = this._player;
			this._player = null;
		}

		if(oplayer) {
			oplayer.mob = null;
		}

		if(player){
			this._player = player;
			player.mob = this;
			this.login();
		}
	}

	set race(race){
		this._race = race;
	}

	get race(){
		return this._race;
	}

	set class(cLass){
		this._class = cLass;
	}

	get class(){
		return this._class;
	}

	__JSONWrite(key, value, json){
		switch(key){
		case "loc":
			if(value instanceof Tile) json.loc = {x:value.x, y:value.y, z:value.z};
			break;

		case "ready": break;
		case "race": json.race = value.name; break;
		case "class": json.class = value.name; break;
		case "health":
			if(value === this.maxHealth) break;
			json.health = value;
			break;
		case "energy":
			if(value === this.maxEnergy) break;
			json.energy = value;
			break;
		case "mana":
			if(value === this.maxMana) break;
			json.mana = value;
			break;
		case "wearLocation": break;
		default: super.__JSONWrite(key, value, json); break;
		}
	}

	__fromJSON(json){
		super.__fromJSON(json);

		// equip things and apply status effects here

		// if stat hasn't been loaded, just make it full
		if(!json.health) this.health = this.maxHealth;
		if(!json.energy) this.energy = this.maxEnergy;
		if(!json.mana) this.mana = this.maxMana;
	}

	__JSONRead(key, value){
		let race, cLass;
		switch(key){
		case "loc":
			this._loc = value;
			break;

		case "race":
			race = RaceManager.getRaceByName(value);
			if(!race) Logger.error(_("BAD RACE: '%s'", value));
			this._race = race;
			break;

		case "class":
			cLass = ClassManager.getClassByName(value);
			if(!cLass) Logger.error(_("BAD CLASS: '%s'", value));
			this._class = cLass;
			break;

		case "wearLocation": break;
		default: super.__JSONRead(key, value); break;
		}
	}

	/**
	 * Runs after a Player is connected to this Mob.
	 */
	login(){
	}

	/**
	 * Runs before a Player is disconnected from this Mob.
	 */
	logout(){
	}

	/**
	 * Shortcut for `player.sendMessage(message, category)`.
	 * @param {string} message 
	 * @param {MessageCategory} category
	 */
	sendMessage(message, category){
		if(this.player) this.player.sendMessage(message, category);
	}

	/**
	 * Shortcut for `player.sendLine(line)`.
	 * @param {string} line 
	 */
	sendLine(line){
		this.sendMessage(line, MessageCategory.DEFAULT);
	}

	showRoom(){
		if(!this.loc) {
			this.sendLine("You aren't anywhere!");
			return;
		}

		// default description
		let desc = util.format("{C%s{x ({Y%s{x)", this.loc.name, util.format("%d,%d,%d",this.x,this.y,this.z));
		desc += "\r\n    " + util.format("{c%s{x", this.loc.description);

		// generate exits
		let exits = [];
		for(let name in Direction.flag){
			let step = this.getStep(Direction.flag[name]);
			if(step && this.canMove(step)) exits.push(Direction.long[name]);
		}

		desc += "\r\n\r\n" + _("[Exits: %s]", exits.length ? exits.join(" ") : "none");

		// generate content descriptions
		for(let obj of this.loc.contents){
			desc += "\r\n    " + util.format("%s", obj.long);
		}

		this.sendMessage(desc, MessageCategory.ROOM);
	}

	gainExperience(amount){
		this.experience += amount;
		while(this.experience >= this.toNextLevel) this.levelup();
	}

	levelup(quiet){
		//let oRace, oClass, oRawAttributes;
		let oRawAttributes, oAbilities;
		if(!quiet || !this.player){
			//oRace = this._race;
			//oClass = this._class;
			oRawAttributes = this.getRawAttributes();
			oAbilities = this.abilities;
		}

		// reset experience
		this.experience = Math.max(this.experience - this.toNextLevel, 0);

		// changes to race/class can happen here

		// create an anonymous status restoration function
		let restore = this.funRestoreRelativeStatus();

		// changes our level -- changes everything
		this.level++;

		// restore status based on previous %
		restore();

		// leveling up is done. don't bother creating a message.
		if(quiet || !this.player) return;

		// create levelup message
		let nRawAttributes = this.getRawAttributes();
		let nAttributes = this.getAttributes();
		let nAbilities = this.abilities;
		let diffAttributes = {};
		for(let attribute in oRawAttributes){
			if(nRawAttributes[attribute] === oRawAttributes[attribute]) continue;
			diffAttributes[attribute] = nRawAttributes[attribute] - oRawAttributes[attribute];
		}

		let msg = _("{yYou are now level {Y%d{x!", this.level);
		for(let attribute in diffAttributes){
			let emphasis = diffAttributes[attribute] > 0 ? "G" : "R";
			let gain = diffAttributes[attribute] > 0;
			let word = gain ? "increased" : "decreased";
			msg += "\r\n" + _("Your %s has %s to {%s%d{x ({%s%s%d{x).",
				Attribute.display[attribute],
				word,
				emphasis,
				nAttributes[attribute],
				emphasis,
				gain ? "+" : "",
				diffAttributes[attribute]);
		}

		for(let oAbility of oAbilities) {
			if(nAbilities.indexOf(oAbility) !== -1) continue; // still know ability
			msg += "\r\n" + _("You forgot an ability: {R%s{x", oAbility.display);
		}

		for(let nAbility of nAbilities) {
			if(oAbilities.indexOf(nAbility) !== -1) continue; // knew this ability before
			msg += "\r\n" + _("You learned a new ability: {G%s{x", nAbility.display);
		}

		this.sendMessage(msg, MessageCategory.LEVELUP);
	}

	equip(equipment){
		if(!(equipment instanceof Equipment)) return false;

		let slot = null;
		switch(equipment.wearLoc){
		case WearLocation.location.FINGER:
			if(this.worn.FINGER_A == null) {
				this.worn.FINGER_A = equipment;
				slot = WearSlot.slot.FINGER_A;
			} else if(this.worn.FINGER_B == null) {
				this.worn.FINGER_B = equipment;
				slot = WearSlot.slot.FINGER_B;
			} else return false;
			break;

		case WearLocation.location.HOLD:
			if(this.worn.HAND_OFF == null) {
				this.worn.HAND_OFF = equipment;
				slot = WearSlot.slot.HAND_OFF;
			} else return false;
			break;

		case WearLocation.location.WEAPON:
			if(this.worn.HAND_PRIMARY == null) {
				this.worn.HAND_PRIMARY = equipment;
				slot = WearSlot.slot.HAND_PRIMARY;
			} else return false;
			break;

		case WearLocation.location.SHIELD:
			if(this.worn.HAND_OFF == null){
				this.worn.HAND_OFF = equipment;
				slot = WearSlot.slot.HAND_OFF;
			} else return false;
			break;

		default:
			if(!this.worn.hasOwnProperty(equipment.wearLoc)) return false;
			if(this.worn[equipment.wearLoc] != null) return false;
			this.worn[equipment.wearLoc] = equipment;
			slot = equipment.wearLoc;
			break;
		}

		equipment.worn = true;
		return slot;
	}

	unequip(equipment){
		if(!(equipment instanceof Equipment)) return false;

		let slot = null;
		switch(equipment.wearLoc){
		case WearLocation.location.FINGER:
			if(this.worn.FINGER_A === equipment) {
				this.worn.FINGER_A = null;
				slot = WearSlot.slot.FINGER_A;
			} else if(this.worn.FINGER_B === equipment) {
				this.worn.FINGER_B = null;
				slot = WearSlot.slot.FINGER_B;
			} else return false;
			break;

		case WearLocation.location.HOLD:
			if(this.worn.HAND_OFF === equipment) {
				this.worn.HAND_OFF = null;
				slot = WearSlot.slot.HAND_OFF;
			} else return false;
			break;

		case WearLocation.location.WEAPON:
			if(this.worn.HAND_PRIMARY === equipment) {
				this.worn.HAND_PRIMARY = null;
				slot = WearSlot.slot.HAND_PRIMARY;
			} else return false;
			break;

		case WearLocation.location.SHIELD:
			if(this.worn.HAND_OFF === equipment){
				this.worn.HAND_OFF = null;
				slot = WearSlot.slot.HAND_OFF;
			} else return false;
			break;

		default:
			if(!this.worn.hasOwnProperty(equipment.wearLoc)) return false;
			if(this.worn[equipment.wearLoc] !== equipment) return false;
			this.worn[equipment.wearLoc] = null;
			slot = equipment.wearLoc;
			break;
		}

		equipment.worn = false;
		return slot;
	}

	getAttributes(){
		return {
			STRENGTH: this.strength,
			ATTACK_POWER: this.attackPower,
			DEFENSE: this.defense,
			VITALITY: this.vitality,
			HEALTH: this.maxHealth,
			AGILITY: this.agility,
			PRECISION: this.precision,
			DEFLECTION: this.deflection,
			STAMINA: this.stamina,
			ENERGY: this.maxEnergy,
			INTELLIGENCE: this.intelligence,
			MAGIC_POWER: this.magicPower,
			RESILIENCE: this.resilience,
			WISDOM: this.wisdom,
			MANA: this.maxMana
		};
	}

	getRawAttributes(){
		return {
			STRENGTH: this.rawStrength,
			ATTACK_POWER: this.rawAttackPower,
			DEFENSE: this.rawDefense,
			VITALITY: this.rawVitality,
			HEALTH: this.rawMaxHealth,
			AGILITY: this.rawAgility,
			PRECISION: this.rawPrecision,
			DEFLECTION: this.rawDeflection,
			STAMINA: this.rawStamina,
			ENERGY: this.rawMaxEnergy,
			INTELLIGENCE: this.rawIntelligence,
			MAGIC_POWER: this.rawMagicPower,
			RESILIENCE: this.rawResilience,
			WISDOM: this.rawWisdom,
			MANA: this.rawMaxMana
		};
	}

	funRestoreRelativeStatus(){
		// store our stat percentages
		let healthP = this.health/this.maxHealth;
		let energyP = this.energy/this.maxEnergy;
		let manaP = this.mana/this.maxMana;

		// returns restoration function for later usage
		return function(){
			this.health = Math.ceil(healthP * this.maxHealth);
			this.energy = Math.ceil(energyP * this.maxEnergy);
			this.mana = Math.ceil(manaP * this.maxMana);
		}.bind(this);
	}

	restore(){
		this.health = this.maxHealth;
		this.energy = this.maxEnergy;
		this.mana = this.maxMana;
	}

	engage(victim){
		if(this.fighting) return;
		this.fighting = victim;
		victim.engage(this);
		CombatManager.add(this);
	}

	disengage(){
		if(!this.fighting) return;
		this.fighting = null;
	}

	combatRound(){
		if(!this.fighting) {
			this.disengage();
			return;
		}

		if(this.fighting.loc !== this.loc) {
			if(this.fighting.fighting === this) this.fighting.disengage();
			this.disengage();
			return;
		}

		this.hit(this.fighting);

		if(this.fighting){
			if(this.hasAbilityByName("maniac")){
				if(Math.probability(0.10)) {
					Communicate.act({
						actor:this,
						recipients:this.loc.contents,
						category:CombatManager.category,
						message:Message.AbilityManiac,
					});
					this.combatRound();
				}
			}
		}
	}

	hit(target){
		// determine hit rate
		let hitChance = 1;

		if(target.hasAbilityByName("evasion")) hitChance -= 0.25; // evasion gives a 10% evasion chance

		// on hit
		if(Math.probability(hitChance)){
			// get weapon and action/type data
			let weapon = this.worn.HAND_PRIMARY;
			let action = weapon ? weapon.action : CombatAction.PUNCH;
			let type = action.type;

			// determine damage
			let damage = target.processDamage({attacker:this, damage:this.attackPower, type:type});

			// damage message
			if(weapon){
				Communicate.hit({
					actor:this,
					directObject:target,
					recipients:this.loc.contents,
					message:Message.AttackHitWeapon,
					weapon:weapon,
					action:action,
					damage:damage
				});
			} else {
				Communicate.hit({
					actor:this,
					directObject:target,
					recipients:this.loc.contents,
					message:Message.AttackHitAuto,
					action:action,
					damage:damage
				});
			}

			// inflict damage
			target.damage(this, damage);

		// on miss
		} else {
			// miss message
			Communicate.hit({
				actor:this,
				directObject:target,
				recipients:this.loc.contents,
				message:Message.AttackMiss,
				damage:0
			});
		}
	}

	processDamage(options){
		let damage = options.damage;
		if(options.attacker){ // process precision vs. deflection
			let precision = options.attacker.precision - this.deflection; // precision value
			let precisionModifier = precision / 25; // 25 points of precision gives 100% bonus damage.
			damage *= 1 + precisionModifier; // apply precision modifier
		}

		// reduce by flat defenses
		if(options.type === DamageType.MAGICAL) damage -= this.resilience / 2;
		else damage -= this.defense / 2;

		// keep it above 0, keep it an integer
		return Math.max(Math.floor(damage), 0);
	}

	damage(attacker, amount){
		this.expend({health:amount});
		attacker.engage(this); //
		this.engage(attacker); // make sure we're engaged on any damage instances
		if(this.health === 0) {
			this.die(attacker);
			attacker.killed(this);
		}
	}

	die(){
		Communicate.act({
			actor:this,
			directObject:this.fighting,
			recipients:this.loc.contents,
			message:Message.DeathCry,
			category:CombatManager.category
		});

		if(this.fighting) this.fighting.disengage();
		this.disengage();

		if(this.player){
			this.restore();
		} else {
			this.loc = null; // delete this mob
		}
	}

	killed(victim){
		let experience = victim.level*300;
		Communicate.experience({
			actor:this,
			directObject:victim,
			recipients:[this],
			message:Message.Kill,
			experience:experience
		});

		this.gainExperience(experience);
	}

	hasAbilityByName(name){
		let abilities = this.abilities;
		for(let ability of abilities){
			if(ability.name === name) return true;
		}

		return false;
	}

	busy(delay){
		this.ready = false;
		setTimeout(function(){
			Communicate.ready({
				actor:this,
				recipients:this.loc.contents,
				message:Message.Ready,
				category:MessageCategory.READY
			});

			this.ready = true;
		}.bind(this), delay);
	}

	heal(options){
		if(!options) return;
		if(options.health) this.health = Math.min(this.health + options.health, this.maxHealth);
		if(options.energy) this.energy = Math.min(this.energy + options.energy, this.maxEnergy);
		if(options.mana) this.mana = Math.min(this.mana + options.mana, this.maxMana);
	}

	expend(options){
		if(!options) return;
		if(options.health) this.health = Math.max(this.health - options.health, 0);
		if(options.energy) this.energy = Math.max(this.energy - options.energy, 0);
		if(options.mana) this.mana = Math.max(this.mana - options.mana, 0);
	}
}

Mob.prototype.ready = true;

Mob.prototype.worn = null;

Mob.prototype.fighting = null;

/** @default "mob" */
Mob.prototype.keywords = "mob";

/** @default "Mob" */
Mob.prototype.display = "Mob";

/**
 * The player currently managing us.
 * @alias Mob#player
 * @type {?Player}
 */
Mob.prototype._player = null;

/**
 * This mob's race.
 * @type {?Race}
 */
Mob.prototype._race = new Race();

/**
 * This mob's class.
 * @type {?Class}
 */
Mob.prototype._class = new Class();

/**
 * This mob's experience level.
 * @type {!number}
 */
Mob.prototype.level = 1;

/**
 * This mob's experience points.
 * @type {!number}
 */
Mob.prototype.experience = 0;

Mob.prototype.health = 0;
Mob.prototype.energy = 0;
Mob.prototype.mana = 0;

Mob.prototype.worn = null;

module.exports = Mob;

/**
 * Sole valid argument for `new Mob()`.
 * @typedef {Object} MobConstructorOptions
 * @property {MapObject} loc Location to move to.
 * @property {boolean} isCharacter Is this mob going to be used for a player's character?
 */
