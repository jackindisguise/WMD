// node includes
var util = require("util");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var CombatManager = require("../manager/CombatManager");
var Communicate = require("../Communicate");
var ChannelManager = require("../manager/ChannelManager");
var Direction = require("../Direction");
var Movable = require("./Movable");
var Tile = require("../map/Tile");
var RaceManager = require("../manager/RaceManager");
var Race = require("../Race");
var ClassManager = require("../manager/ClassManager");
var Class = require("../Class");
var MessageCategory = require("../MessageCategory");
var Attribute = require("../Attribute");
var WearLocation = require("../WearLocation");
var WearSlot = require("../WearSlot");
var Equipment = require("./Equipment");
var CombatAction = require("../CombatAction");

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
		if(this.name) return this.name;
		return util.format("{Mob@%s}", Movable.toString.call(this));
	}

	get rawStrength(){
		var strength = 0;
		strength += this._race.getStrengthByLevel(this.level);
		strength += this._class.getStrengthByLevel(this.level);
		return Math.floor(strength);
	}

	get strength(){
		var strength = 0;
		strength += this._race.getStrengthByLevel(this.level);
		strength += this._class.getStrengthByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) strength += eq.strength;
		}
		return Math.floor(strength);
	}

	get rawAttackPower(){
		var attackPower = 0;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		return Math.floor(attackPower);
	}

	get attackPower(){
		var attackPower = this.strength;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) attackPower += eq.attackPower;
		}
		return Math.floor(attackPower);
	}

	get rawDefense(){
		var defense = 0;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		return Math.floor(defense);
	}

	get defense(){
		var defense = this.strength;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) defense += eq.defense;
		}
		return Math.floor(defense);
	}

	get rawVitality(){
		var vitality = 0;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		return Math.floor(vitality);
	}

	get vitality(){
		var vitality = this.strength;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) vitality += eq.vitality;
		}
		return Math.floor(vitality);
	}

	get rawMaxHealth(){
		var health = 0;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		return Math.floor(health);
	}

	get maxHealth(){
		var health = this.vitality;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) health += eq.health;
		}
		return Math.floor(health);
	}

	get rawAgility(){
		var agility = 0;
		agility += this._race.getAgilityByLevel(this.level);
		agility += this._class.getAgilityByLevel(this.level);
		return Math.floor(agility);
	}

	get agility(){
		var agility = 0;
		agility += this._race.getAgilityByLevel(this.level);
		agility += this._class.getAgilityByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) agility += eq.agility;
		}
		return Math.floor(agility);
	}

	get rawPrecision(){
		var speed = 0;
		speed += this._race.getPrecisionByLevel(this.level);
		speed += this._class.getPrecisionByLevel(this.level);
		return Math.floor(speed);
	}

	get precision(){
		var speed = this.agility;
		speed += this._race.getPrecisionByLevel(this.level);
		speed += this._class.getPrecisionByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) speed += eq.speed;
		}
		return Math.floor(speed);
	}

	get rawDeflection(){
		var evasion = 0;
		evasion += this._race.getDeflectionByLevel(this.level);
		evasion += this._class.getDeflectionByLevel(this.level);
		return Math.floor(evasion);
	}

	get deflection(){
		var evasion = this.agility;
		evasion += this._race.getDeflectionByLevel(this.level);
		evasion += this._class.getDeflectionByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) evasion += eq.evasion;
		}
		return Math.floor(evasion);
	}

	get rawStamina(){
		var stamina = 0;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		return Math.floor(stamina);
	}

	get stamina(){
		var stamina = this.agility;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) stamina += eq.stamina;
		}
		return Math.floor(stamina);
	}

	get rawMaxEnergy(){
		var energy = 0;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		return Math.floor(energy);
	}

	get maxEnergy(){
		var energy = this.stamina;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) energy += eq.energy;
		}
		return Math.floor(energy);
	}

	get rawIntelligence(){
		var intelligence = 0;
		intelligence += this._race.getIntelligenceByLevel(this.level);
		intelligence += this._class.getIntelligenceByLevel(this.level);
		return Math.floor(intelligence);
	}

	get intelligence(){
		var intelligence = 0;
		intelligence += this._race.getIntelligenceByLevel(this.level);
		intelligence += this._class.getIntelligenceByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) intelligence += eq.intelligence;
		}
		return Math.floor(intelligence);
	}

	get rawMagicPower(){
		var magicPower = 0;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		return Math.floor(magicPower);
	}

	get magicPower(){
		var magicPower = this.intelligence;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) magicPower += eq.magicPower;
		}
		return Math.floor(magicPower);
	}

	get rawResilience(){
		var resilience = 0;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		return Math.floor(resilience);
	}

	get resilience(){
		var resilience = this.intelligence;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) resilience += eq.resilience;
		}
		return Math.floor(resilience);
	}

	get rawWisdom(){
		var wisdom = 0;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		return Math.floor(wisdom);
	}

	get wisdom(){
		var wisdom = this.intelligence;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) wisdom += eq.wisdom;
		}
		return Math.floor(wisdom);
	}

	get rawMaxMana(){
		var mana = 0;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		return Math.floor(mana);
	}

	get maxMana(){
		var mana = this.wisdom;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		for(var slot in this.worn){
			var eq = this.worn[slot];
			if(eq) mana += eq.mana;
		}
		return Math.floor(mana);
	}

	get toNextLevel(){
		var tnl = 0;
		tnl += this._race.getToNextLevelByLevel(this.level);
		tnl += this._class.getToNextLevelByLevel(this.level);
		return Math.floor(tnl);
	}

	get tnl(){
		return this.toNextLevel;
	}

	get player(){
		return this._player;
	}

	set player(player){
		if(this._player === player) return;

		var oplayer;
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

			case "race": json.race = value.name; break;
			case "class": json.class = value.name; break;
			case "health":
				if(value == this.maxHealth) break;
				json.health = value;
				break;
			case "energy":
				if(value == this.maxEnergy) break;
				json.energy = value;
				break;
			case "mana":
				if(value == this.maxMana) break;
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
		switch(key){
			case "loc":
				this._loc = value;
				break;

			case "race":
				var race = RaceManager.getRaceByName(value);
				if(!race) Logger.error(_("BAD RACE: '%s'", value));
				this._race = race;
				break;

			case "class":
				var cLass = ClassManager.getClassByName(value);
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
		var desc = util.format("{C%s {D(%s){x\r\n    {c%s{x", this.loc.name, util.format("%d,%d,%d",this.x,this.y,this.z), this.loc.description);

		// generate exits
		var exits = [];
		for(var name in Direction.flag){
			var step = this.getStep(Direction.flag[name]);
			if(step && this.canMove(step)) exits.push(Direction.long[name]);
		}

		desc += "\r\n\r\n" + _("{c[{CExits: {W%s{c]{x", exits.length ? exits.join(" ") : "none");

		// generate content descriptions
		for(var obj of this.loc.contents){
			desc += "\r\n" + util.format("    %s", obj.name);
		}

		this.sendLine(desc);
	}

	gainExperience(amount){
		this.experience += amount;
		while(this.experience >= this.toNextLevel) this.levelup();
	}

	levelup(quiet){
		var oRace, oClass, oRawAttributes;
		if(!quiet || !this.player){
			oRace = this._race;
			oClass = this._class;
			oRawAttributes = this.getRawAttributes();
		}

		this.experience = 0;

		// changes to race/class can happen here

		// create an anonymous status restoration function
		var restore = this.getRestoreRelativeStatusFunc();

		// changes our level -- changes everything
		this.level++;

		// restore status based on previous %
		restore();

		// leveling up is done. don't bother creating a message.
		if(quiet || !this.player) return;

		// create levelup message
		var nRawAttributes = this.getRawAttributes();
		var nAttributes = this.getAttributes();
		var diffAttributes = {};
		for(var attribute in oRawAttributes){
			if(nRawAttributes[attribute] == oRawAttributes[attribute]) continue;
			diffAttributes[attribute] = nRawAttributes[attribute] - oRawAttributes[attribute];
		}

		var msg = _("{YYou are now level {W%d{x!", this.level);
		for(var attribute in diffAttributes){
			var emphasis = diffAttributes[attribute] > 0 ? "G" : "R";
			var gain = diffAttributes[attribute] > 0;
			var word = gain ? "increased" : "decreased";
			msg += "\r\n" + _("Your %s has %s to {W%d{x ({%s%s%d{x).",
								Attribute.display[attribute],
								word,
								nAttributes[attribute],
								emphasis,
								gain ? "+" : "", diffAttributes[attribute]);
		}

		this.sendLine(msg);
	}

	equip(equipment){
		if(!(equipment instanceof Equipment)) return false;

		var slot = null;
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

		var slot = null;
		switch(equipment.wearLoc){
			case WearLocation.location.FINGER:
				if(this.worn.FINGER_A == equipment) {
					this.worn.FINGER_A = null;
					slot = WearSlot.slot.FINGER_A;
				} else if(this.worn.FINGER_B == equipment) {
					this.worn.FINGER_B = null;
					slot = WearSlot.slot.FINGER_B;
				} else return false;
				break;

			case WearLocation.location.HOLD:
				if(this.worn.HAND_OFF == equipment) {
					this.worn.HAND_OFF = null;
					slot = WearSlot.slot.HAND_OFF;
				} else return false;
				break;

			case WearLocation.location.WEAPON:
				if(this.worn.HAND_PRIMARY == equipment) {
					this.worn.HAND_PRIMARY = null;
					slot = WearSlot.slot.HAND_PRIMARY;
				} else return false;
				break;

			case WearLocation.location.SHIELD:
				if(this.worn.HAND_OFF == equipment){
					this.worn.HAND_OFF = null;
					slot = WearSlot.slot.HAND_OFF;
				} else return false;
				break;

			default:
				if(!this.worn.hasOwnProperty(equipment.wearLoc)) return false;
				if(this.worn[equipment.wearLoc] != equipment) return false;
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

	getRestoreRelativeStatusFunc(){
		// store our stat percentages
		var healthP = this.health/this.maxHealth;
		var energyP = this.energy/this.maxEnergy;
		var manaP = this.mana/this.maxMana;

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

		if(this.fighting.loc != this.loc) {
			if(this.fighting.fighting == this) this.fighting.disengage();
			this.disengage();
			return;
		}

		this.hit(this.fighting);
	}

	hit(target){
		// determine hit rate
		var hitChance = 1;

		// on hit
		if(Math.probability(hitChance)){
			// determine damage
			var damage = target.preDamage(this, this.attackPower, false);

			// damage message
			Communicate.attack(this, target, CombatAction.PUNCH, damage);

			// inflict damage
			target.damage(this, damage)

		// on miss
		} else {
			// miss message
			Communicate.act(
				this,
				{
					firstPerson: "Your hit misses $N.",
					secondPerson: "$n's hit misses you.",
					thirdPerson: "$n's hit misses $N."
				},
				this.loc.contents,
				{directObject:target}
			);
		}
	}

	preDamage(attacker, amount, magic){
		if(magic) amount -= this.resilience / 2;
		else {
			var precision = attacker.precision - this.deflection; // precision value
			var precisionModifier = precision / 25; // 25 points of precision gives 100% bonus damage.
			amount *= 1 + precisionModifier; // apply precision modifier
			amount -= this.defense / 2; // reduce damage by defense
		}
		return Math.max(Math.floor(amount), 0);
	}

	damage(attacker, amount){
		this.health -= amount;
		attacker.engage(this); //
		this.engage(attacker); // make sure we're engaged on any damage instances
		if(this.health <= 0) {
			this.health = 0;
			this.die(attacker);
			attacker.killed(this);
		}
	}

	die(killer){
		Communicate.act(
			this,
			{
				firstPerson: "You die.",
				thirdPerson: "$n dies."
			},
			this.loc.contents
		);

		if(this.fighting) this.fighting.disengage();
		this.disengage();
		this.restore();
	}

	killed(victim){
		var experience = victim.level*100;
		this.sendLine(_("{CYou gain {W%d{C experience.{x", experience));
		this.gainExperience(experience);
	}
}

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
