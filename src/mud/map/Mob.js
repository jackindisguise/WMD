// node includes
const util = require("util");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const DamageType = require("../../etc/DamageType");
const Message = require("../../etc/Message");
const CombatAction = require("../../etc/CombatAction");
const Direction = require("../../etc/Direction");
const MessageCategory = require("../../etc/MessageCategory");
const AttributeName = require("../../etc/AttributeName");
const WearSlotType = require("../../etc/WearSlotType");
const WearSlotName = require("../../etc/WearSlotName");
const WearSlot = require("../WearSlot");
const CombatManager = require("../manager/CombatManager");
const RaceManager = require("../manager/RaceManager");
const ClassManager = require("../manager/ClassManager");
const EffectManager = require("../manager/EffectManager");
const Communicate = require("../Communicate");
const Tile = require("../map/Tile");
const Race = require("../Race");
const Class = require("../Class");
const Time = require("../Time");
const Movable = require("./Movable");
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

		// active effects
		this._effects = []; // effects on us

		// generate wear slots
		this.createWearSlot({type:WearSlotType.HEAD, name:WearSlotName.HEAD});
		this.createWearSlot({type:WearSlotType.NECK, name:WearSlotName.NECK});
		this.createWearSlot({type:WearSlotType.SHOULDER, name:WearSlotName.SHOULDER});
		this.createWearSlot({type:WearSlotType.ARMS, name:WearSlotName.ARMS});
		this.createWearSlot({type:WearSlotType.HANDS, name:WearSlotName.HANDS});
		this.createWearSlot({type:WearSlotType.FINGER, name:WearSlotName.FINGER_A});
		this.createWearSlot({type:WearSlotType.FINGER, name:WearSlotName.FINGER_B});
		this.createWearSlot({type:WearSlotType.TORSO, name:WearSlotName.TORSO});
		this.createWearSlot({type:WearSlotType.WAIST, name:WearSlotName.WAIST});
		this.createWearSlot({type:WearSlotType.LEGS, name:WearSlotName.LEGS});
		this.createWearSlot({type:WearSlotType.FEET, name:WearSlotName.FEET});
		this.createWearSlot({type:WearSlotType.WEAPON, name:WearSlotName.HAND_PRIMARY});
		this.createWearSlot({type:WearSlotType.OFFHAND, name:WearSlotName.HAND_OFF});
	}

	createWearSlot(options){
		if(!this._slots) this._slots = []; // initialize slots
		let slot = new WearSlot(options); // create new slot
		this._slots.push(slot); // add to slots
	}

	__JSONWrite(key, value, json){
		let effects;
		switch(key){
		case "_loc":
			if(!(value instanceof Tile)) break; // not on a map tile
			if(!value.map) break; // on a map tile, but it's a template or something
			json.loc = {map:this.map.name, x:value.x, y:value.y, z:value.z};
			break;

		case "_effects":
			if(!this._effects.length) break; // no active effects

			// generate effects array
			effects = [];
			for(let effect of this._effects) effects.push(effect.__toJSON());
			json.effects = effects;
			break;

		case "_race": json.race = value.name; break;
		case "_class": json.class = value.name; break;
		case "health":
			if(value === this.maxHealth) break; // already max
			json.health = value;
			break;
		case "energy":
			if(value === this.maxEnergy) break; // already max
			json.energy = value;
			break;
		case "mana":
			if(value === this.maxMana) break; // already max
			json.mana = value;
			break;

		default: super.__JSONWrite(key, value, json); break;
		}
	}

	__JSONRead(key, value){
		let race, cLass;
		switch(key){
		case "loc":
			this._tmploc = value;
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

		case "effects":
			for(let json of value){
				let effectMaster = EffectManager.getEffectByName(json.name);
				if(!effectMaster){
					Logger.error(_("BAD EFFECT NAME: '%s'", json.name));
					continue;
				}

				let constructor = effectMaster.constructor;
				let effect = new constructor(json); // load values directly into constructor
				effect.apply(this, true); // apply to mob
				// TO DO: add silent option for apply
			}

			break;

		default: super.__JSONRead(key, value); break;
		}
	}

	__finalize(json){
		// equip things and apply status effects here
		for(let equipment of this._contents){
			if(!(equipment instanceof Equipment)) continue;
			if(!equipment.worn) continue;
			let name = equipment.worn;
			let slot = this.getSlotByName(name);
			if(!slot) equipment.worn = null; // not a valid slot. ignore.
			else { // manual equip. add options to equip later.
				slot.worn = equipment;
				equipment.worn = slot;
			}
		}

		// if stat hasn't been loaded, just make it full
		if(!json.health) this.health = this.maxHealth;
		if(!json.energy) this.energy = this.maxEnergy;
		if(!json.mana) this.mana = this.maxMana;
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
		for(let effect of this._effects) strength += effect.strength;
		for(let worn of this.worn) strength += worn.strength;
		return Math.floor(strength);
	}

	get rawAttackPower(){
		let attackPower = this.rawStrength;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		return Math.floor(attackPower);
	}

	get attackPower(){
		let attackPower = this.strength;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		for(let effect of this._effects) attackPower += effect.attackPower;
		for(let worn of this.worn) attackPower += worn.attackPower;
		return Math.floor(attackPower);
	}

	get rawDefense(){
		let defense = this.rawStrength;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		return Math.floor(defense);
	}

	get defense(){
		let defense = this.strength;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		for(let effect of this._effects) defense += effect.defense;
		for(let worn of this.worn) defense += worn.defense;
		return Math.floor(defense);
	}

	get rawVitality(){
		let vitality = this.rawStrength;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		return Math.floor(vitality);
	}

	get vitality(){
		let vitality = this.strength;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		for(let effect of this._effects) vitality += effect.vitality;
		for(let worn of this.worn) vitality += worn.vitality;
		return Math.floor(vitality);
	}

	get rawMaxHealth(){
		let health = this.rawVitality * 3;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		return Math.floor(health);
	}

	get maxHealth(){
		let health = this.vitality * 3;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		for(let effect of this._effects) health += effect.health;
		for(let worn of this.worn) health += worn.health;
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
		for(let effect of this._effects) agility += effect.agility;
		for(let worn of this.worn) agility += worn.agility;
		return Math.floor(agility);
	}

	get rawPrecision(){
		let precision = this.rawAgility;
		precision += this._race.getPrecisionByLevel(this.level);
		precision += this._class.getPrecisionByLevel(this.level);
		return Math.floor(precision);
	}

	get precision(){
		let precision = this.agility;
		precision += this._race.getPrecisionByLevel(this.level);
		precision += this._class.getPrecisionByLevel(this.level);
		for(let effect of this._effects) precision += effect.precision;
		for(let worn of this.worn) precision += worn.precision;
		return Math.floor(precision);
	}

	get rawDeflection(){
		let deflection = this.rawAgility;
		deflection += this._race.getDeflectionByLevel(this.level);
		deflection += this._class.getDeflectionByLevel(this.level);
		return Math.floor(deflection);
	}

	get deflection(){
		let deflection = this.agility;
		deflection += this._race.getDeflectionByLevel(this.level);
		deflection += this._class.getDeflectionByLevel(this.level);
		for(let effect of this._effects) deflection += effect.deflection;
		for(let worn of this.worn) deflection += worn.deflection;
		return Math.floor(deflection);
	}

	get rawStamina(){
		let stamina = this.rawAgility;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		return Math.floor(stamina);
	}

	get stamina(){
		let stamina = this.agility;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		for(let effect of this._effects) stamina += effect.stamina;
		for(let worn of this.worn) stamina += worn.stamina;
		return Math.floor(stamina);
	}

	get rawMaxEnergy(){
		let energy = this.rawStamina;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		return Math.floor(energy);
	}

	get maxEnergy(){
		let energy = this.stamina;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		for(let effect of this._effects) energy += effect.energy;
		for(let worn of this.worn) energy += worn.energy;
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
		for(let effect of this._effects) intelligence += effect.intelligence;
		for(let worn of this.worn) intelligence += worn.intelligence;
		return Math.floor(intelligence);
	}

	get rawMagicPower(){
		let magicPower = this.rawIntelligence;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		return Math.floor(magicPower);
	}

	get magicPower(){
		let magicPower = this.intelligence;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		for(let effect of this._effects) magicPower += effect.magicPower;
		for(let worn of this.worn) magicPower += worn.magicPower;
		return Math.floor(magicPower);
	}

	get rawResilience(){
		let resilience = this.rawIntelligence;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		return Math.floor(resilience);
	}

	get resilience(){
		let resilience = this.intelligence;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		for(let effect of this._effects) resilience += effect.resilience;
		for(let worn of this.worn) resilience += worn.resilience;
		return Math.floor(resilience);
	}

	get rawWisdom(){
		let wisdom = this.rawIntelligence;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		return Math.floor(wisdom);
	}

	get wisdom(){
		let wisdom = this.intelligence;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		for(let effect of this._effects) wisdom += effect.wisdom;
		for(let worn of this.worn) wisdom += worn.wisdom;
		return Math.floor(wisdom);
	}

	get rawMaxMana(){
		let mana = this.rawWisdom;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		return Math.floor(mana);
	}

	get maxMana(){
		let mana = this.wisdom;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		for(let effect of this._effects) mana += effect.mana;
		for(let worn of this.worn) mana += worn.mana;
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

	get worn(){
		let worn = [];
		for(let slot of this._slots){
			if(!slot.worn) continue;
			worn.push(slot.worn);
		}

		return worn;
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
			this.player.mob = this;
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
		while(this.experience >= this.toNextLevel) {
			this.experience -= this.toNextLevel;
			this.levelup();
		}
	}

	levelup(quiet){
		//let oRace, oClass, oRawAttributes;
		let oAttributeBonuses, oAbilities;
		if(!quiet || !this.player){
			//oRace = this._race;
			//oClass = this._class;
			oAttributeBonuses = this.getAttributeBonuses();
			oAbilities = this.abilities;
		}

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
		let nAttributeBonuses = this.getAttributeBonuses();
		let nAttributes = this.getAttributes();
		let nAbilities = this.abilities;
		let diffAttributes = {};

		for(let attribute in oAttributeBonuses){
			if(nAttributeBonuses[attribute] === oAttributeBonuses[attribute]) continue;
			diffAttributes[attribute] = nAttributeBonuses[attribute] - oAttributeBonuses[attribute];
		}

		let msg = _("{yYou are now level {Y%d{x!", this.level);
		for(let attribute in diffAttributes){
			let emphasis = diffAttributes[attribute] > 0 ? "G" : "R";
			let gain = diffAttributes[attribute] > 0;
			let word = gain ? "increased" : "decreased";
			msg += "\r\n" + _("Your %s has %s to {%s%d{x ({%s%s%d{x).",
				attribute,
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

	getSlotByName(name){
		for(let slot of this._slots){
			if(slot.name === name) return slot;
		}
	}

	getSlotByType(type){
		for(let slot of this._slots){
			if(slot.type === type) return slot;
		}
	}

	getEmptySlotByType(type){
		for(let slot of this._slots){
			if(slot.type !== type) continue;
			if(slot.worn) continue;
			return slot;
		}
	}

	equip(equipment){
		if(!(equipment instanceof Equipment)) return false;
		let restore = this.funRestoreRelativeStatus(); // anonymous status restoration function
		let slot = this.getEmptySlotByType(equipment.slotType);
		if(!slot) return false;
		equipment.worn = slot;
		slot.worn = equipment;
		restore();
		return true;
	}

	unequip(equipment){
		if(!(equipment instanceof Equipment)) return false;
		let restore = this.funRestoreRelativeStatus(); // anonymous status restoration function
		let slot = equipment.worn;
		if(this._slots.indexOf(slot) === -1) return; // we're not wearing this... somehow
		equipment.worn = null;
		slot.worn = null;
		restore();
		return true;
	}

	getAttributeByName(name){
		switch(name){
		case AttributeName.STRENGTH: return this.strength;
		case AttributeName.ATTACK_POWER: return this.attackPower;
		case AttributeName.DEFENSE: return this.defense;
		case AttributeName.VITALITY: return this.vitality;
		case AttributeName.MAX_HEALTH: return this.maxHealth;
		case AttributeName.INTELLIGENCE: return this.intelligence;
		case AttributeName.MAGIC_POWER: return this.magicPower;
		case AttributeName.RESILIENCE: return this.resilience;
		case AttributeName.WISDOM: return this.wisdom;
		case AttributeName.MAX_MANA: return this.maxMana;
		case AttributeName.AGILITY: return this.agility;
		case AttributeName.PRECISION: return this.precision;
		case AttributeName.DEFLECTION: return this.deflection;
		case AttributeName.STAMINA: return this.stamina;
		case AttributeName.MAX_ENERGY: return this.maxEnergy;
		}
	}

	getRawAttributeByName(name){
		switch(name){
		case AttributeName.STRENGTH: return this.rawStrength;
		case AttributeName.ATTACK_POWER: return this.rawAttackPower;
		case AttributeName.DEFENSE: return this.rawDefense;
		case AttributeName.VITALITY: return this.rawVitality;
		case AttributeName.MAX_HEALTH: return this.rawMaxHealth;
		case AttributeName.INTELLIGENCE: return this.rawIntelligence;
		case AttributeName.MAGIC_POWER: return this.rawMagicPower;
		case AttributeName.RESILIENCE: return this.rawResilience;
		case AttributeName.WISDOM: return this.rawWisdom;
		case AttributeName.MAX_MANA: return this.rawMaxMana;
		case AttributeName.AGILITY: return this.rawAgility;
		case AttributeName.PRECISION: return this.rawPrecision;
		case AttributeName.DEFLECTION: return this.rawDeflection;
		case AttributeName.STAMINA: return this.rawStamina;
		case AttributeName.MAX_ENERGY: return this.rawMaxEnergy;
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

	getRawAttributes(){
		let attributes = {};
		for(let entry in AttributeName){
			let name = AttributeName[entry];
			attributes[name] = this.getRawAttributeByName(name);
		}

		return attributes;
	}

	getAttributeBonuses(){
		let attributes = this.getRawAttributes();

		// use derivatives for stats first
		attributes[AttributeName.MAX_HEALTH] -= attributes[AttributeName.VITALITY] * 3;
		attributes[AttributeName.MAX_MANA] -= attributes[AttributeName.WISDOM];
		attributes[AttributeName.MAX_ENERGY] -= attributes[AttributeName.STAMINA];

		// now secondary attributes
		attributes[AttributeName.ATTACK_POWER] -= attributes[AttributeName.STRENGTH];
		attributes[AttributeName.DEFENSE] -= attributes[AttributeName.STRENGTH];
		attributes[AttributeName.VITALITY] -= attributes[AttributeName.STRENGTH];
		attributes[AttributeName.MAGIC_POWER] -= attributes[AttributeName.INTELLIGENCE];
		attributes[AttributeName.RESILIENCE] -= attributes[AttributeName.INTELLIGENCE];
		attributes[AttributeName.WISDOM] -= attributes[AttributeName.INTELLIGENCE];
		attributes[AttributeName.PRECISION] -= attributes[AttributeName.AGILITY];
		attributes[AttributeName.DEFLECTION] -= attributes[AttributeName.AGILITY];
		attributes[AttributeName.STAMINA] -= attributes[AttributeName.AGILITY];
		return attributes;
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

	restore(mod=1){
		this.heal({
			health:this.maxHealth * mod,
			energy:this.maxEnergy * mod,
			mana:this.maxMana * mod
		});
	}

	engage(victim){
		if(this.fighting) return;
		this.fighting = victim;
		victim.engage(this);
		this.combat();
	}

	// start fighting
	combat(){
		if(this._combatID != null) return;

		// time until next interval
		let delay = Time.getIntervalDelay(3000);

		// start combat!
		this._combatID = setTimeout(function(){
			// remove combatID member
			delete this._combatID;

			// do nothing if we're not fighting :)
			if(this.fighting === null) return;

			// do a round of combat
			this.combatRound();

			// propagate
			this.combat();
		}.bind(this),
		delay);
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

		if(target.hasAbilityByName("evasion")) hitChance -= 0.1; // evasion gives a 10% evasion chance

		// on hit
		if(Math.probability(hitChance)){
			// get weapon and action/type data
			let weapon = this._slots.HAND_PRIMARY;
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
		attacker.engage(this);
		this.engage(attacker); // make sure we're engaged on any damage instances
		if(this.health === 0) {
			this.die(attacker);
			attacker.kill(this);
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
			this.heal({health:this.maxHealth * 0.2}); // restore 20% of HP
		} else {
			this.garbage();
		}
	}

	kill(victim){
		let experience = Math.max(200 + (victim.level - this.level) * 50, 1);
		Communicate.experience({
			actor:this,
			directObject:victim,
			recipients:[this],
			message:Message.Kill,
			experience:experience,
			category:CombatManager.category
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

	// get busy
	busy(delay){
		this._ready = false;
		this._busyID = setTimeout(function(){
			// delete busyID member
			delete this._busyID;
	
			// let us know
			Communicate.ready({
				actor:this,
				recipients:this.loc.contents,
				message:Message.Ready,
				category:MessageCategory.READY
			});

			// ready up
			this._ready = true;
		}.bind(this), delay);
	}

	heal(options){
		if(!options) return;
		if(options.health) this.health = Math.min(this.health + Math.floor(options.health), this.maxHealth);
		if(options.energy) this.energy = Math.min(this.energy + Math.floor(options.energy), this.maxEnergy);
		if(options.mana) this.mana = Math.min(this.mana + Math.floor(options.mana), this.maxMana);
	}

	expend(options){
		if(!options) return;
		if(options.health) {
			this.health = Math.max(this.health - Math.floor(options.health), 0);
			if(this.health < this.maxHealth) this.regenerate();
		}

		if(options.energy) {
			this.energy = Math.max(this.energy - Math.floor(options.energy), 0);
			if(this.energy < this.maxEnergy) this.regenerate();
		}

		if(options.mana) {
			this.mana = Math.max(this.mana - Math.floor(options.mana), 0);
			if(this.mana < this.maxMana) this.regenerate();
		}
	}

	// start regenerating
	regenerate(){
		if(this._regenID != null) return;
		let delay = Time.getIntervalDelay(30000);
		this._regenID = setTimeout(function(){
			delete this._regenID; // delete regenID member

			// current stat values
			let currentHP = this.health, maxHP = this.maxHealth;
			let currentMP = this.mana, maxMP = this.maxMana;
			let currentEP = this.energy, maxEP = this.maxEnergy;
			if(currentHP === maxHP && currentMP === maxMP && currentEP === maxEP) return; // already maxed out

			// wait for them to stop fighting
			if(this.fighting) {
				this.regenerate();
				return;
			}

			// regen options
			let health = 0,
				mana = 0,
				energy = 0,
				suffixes = [],
				commOptions = {actor:this, recipients:[this], suffix:suffixes},
				regOptions = {};

			if(currentHP < maxHP) {
				health = Math.floor(maxHP / 5);
				regOptions.health = health;
				commOptions.health = health;
				suffixes.push(Message.ActorRegenHealthSuffix);
			}

			if(currentMP < maxMP) {
				mana = Math.floor(maxMP / 5);
				regOptions.mana = mana;
				commOptions.mana = mana;
				suffixes.push(Message.ActorRegenManaSuffix);
			}

			if(currentEP < maxEP) {
				energy = Math.floor(maxEP / 5);
				regOptions.energy = energy;
				commOptions.energy = energy;
				suffixes.push(Message.ActorRegenEnergySuffix);
			}

			// send message
			if(health || mana || energy) {
				Communicate.regen(commOptions);
				this.heal(regOptions);
			}

			// propagate
			this.regenerate();
		}.bind(this),
		delay);
	}

	addEffect(effect){
		let pos = this._effects.indexOf(effect);
		if(pos !== -1) return; // already effects
		let restore = this.funRestoreRelativeStatus(); // anonymous status restoration function
		this._effects.push(effect);
		if(effect.affectee !== this) effect.affectee = this;
		restore(); // restore status based on previous %
	}

	removeEffect(effect){
		let pos = this._effects.indexOf(effect);
		if(pos === -1) return; // not effected by this
		let restore = this.funRestoreRelativeStatus(); // anonymous status restoration function
		this._effects.splice(pos, 1);
		if(effect.affectee === this) effect.affectee = null;
		restore(); // restore status based on previous %
	}

	hasEffectByName(name){
		for(let effect of this._effects){
			if(effect.name === name){
				return effect;
			}
		}
	}

	// get rid of anything tying us to the game
	garbage(){
		super.garbage();
		this.disengage();
		if(this._regenID) { // stop regenerating
			clearTimeout(this._regenID);
			delete this._regenID;
		}

		if(this._busyID) { // don't worry about being busy
			clearTimeout(this._busyID);
			delete this._busyID;
		}

		if(this._combatID){ // stop combat
			this.disengage();
			clearTimeout(this._combatID);
			delete this._combatID;
		}

		// stop any effect timers
		if(this._effects) for(let effect of this._effects) effect.stop();
	}
}

Mob.prototype._ready = true;

Mob.prototype._slots = null;

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

Mob.prototype._effects = null;

module.exports = Mob;

/**
 * Sole valid argument for `new Mob()`.
 * @typedef {Object} MobConstructorOptions
 * @property {MapObject} loc Location to move to.
 * @property {boolean} isCharacter Is this mob going to be used for a player's character?
 */
