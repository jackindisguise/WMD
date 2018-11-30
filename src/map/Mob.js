// node includes
var util = require("util");

// local includes
var Player;
var Movable = require("./Movable");
var Race = require("../mud/Race");
var Class = require("../mud/Class");
var Database = require("../mud/core/Database");
var PlayerData = require("../mud/core/PlayerData");
var MessageCategory = require("../mud/MessageCategory");

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

		if(options){
			if(options.isCharacter) this.playerData = new PlayerData();
		}
	}

	toString(){
		if(this.name) return this.name;
		return util.format("{Mob@%s}", Movable.toString.call(this));
	}

	get strength(){
		var strength = 0;
		strength += this.race.getStrengthByLevel(this.level);
		strength += this.class.getStrengthByLevel(this.level);
		return strength;
	}

	get attackPower(){
		var attackPower = this.strength;
		attackPower += this.race.getAttackPowerByLevel(this.level);
		attackPower += this.class.getAttackPowerByLevel(this.level);
		return attackPower;
	}

	get defense(){
		var defense = this.strength;
		defense += this.race.getDefenseByLevel(this.level);
		defense += this.class.getDefenseByLevel(this.level);
		return defense;
	}

	get vitality(){
		var vitality = this.strength;
		vitality += this.race.getVitalityByLevel(this.level);
		vitality += this.class.getVitalityByLevel(this.level);
		return vitality;
	}

	get health(){
		var health = this.vitality * 10;
		health += this.race.getHealthByLevel(this.level);
		health += this.class.getHealthByLevel(this.level);
		return health;
	}

	get agility(){
		var agility = 0;
		agility += this.race.getAgilityByLevel(this.level);
		agility += this.class.getAgilityByLevel(this.level);
		return agility;
	}

	get speed(){
		var speed = this.agility;
		speed += this.race.getSpeedByLevel(this.level);
		speed += this.class.getSpeedByLevel(this.level);
		return speed;
	}

	get evasion(){
		var evasion = this.agility;
		evasion += this.race.getEvasionByLevel(this.level);
		evasion += this.class.getEvasionByLevel(this.level);
		return evasion;
	}

	get stamina(){
		var stamina = this.agility;
		stamina += this.race.getStaminaByLevel(this.level);
		stamina += this.class.getStaminaByLevel(this.level);
		return stamina;
	}

	get energy(){
		var energy = this.stamina * 10;
		energy += this.race.getEnergyByLevel(this.level);
		energy += this.class.getEnergyByLevel(this.level);
		return energy;
	}

	get intelligence(){
		var intelligence = 0;
		intelligence += this.race.getIntelligenceByLevel(this.level);
		intelligence += this.class.getIntelligenceByLevel(this.level);
		return intelligence;
	}

	get magicPower(){
		var magicPower = this.intelligence;
		magicPower += this.race.getMagicPowerByLevel(this.level);
		magicPower += this.class.getMagicPowerByLevel(this.level);
		return magicPower;
	}

	get resilience(){
		var resilience = this.intelligence;
		resilience += this.race.getResilienceByLevel(this.level);
		resilience += this.class.getResilienceByLevel(this.level);
		return resilience;
	}

	get wisdom(){
		var wisdom = this.intelligence;
		wisdom += this.race.getWisdomByLevel(this.level);
		wisdom += this.class.getWisdomByLevel(this.level);
		return wisdom;
	}

	get mana(){
		var mana = this.wisdom * 10;
		mana += this.race.getManaByLevel(this.level);
		mana += this.class.getManaByLevel(this.level);
		return mana;
	}

	get toNextLevel(){
		var tnl = 0;
		tnl += this.race.getToNextLevelByLevel(this.level);
		tnl += this.class.getToNextLevelByLevel(this.level);
		return tnl;
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
			oplayer = this._player;
			this._player = null;
		}

		if(oplayer) {
			oplayer.mob = null;
			this.logout(oplayer);
		}

		if(player && (player instanceof Player)){
			this._player = player;
			player.mob = this;
			this.login(player);
		}
	}

	/**
	 * Shortcut for the display name.
	 */
	get name(){
		return this.display;
	}

	/**
	 * Shortcut for setting both display name and keywords.
	 */
	set name(name){
		this.display = name;
		this.keywords = name;
	}

	__JSONWrite(key, value, json){
		switch(key){
			case "race": json.race = value.id; break;
			case "class": json.class = value.id; break;
			default: Movable.__JSONWrite.call(this, key, value, json); break;
		}
	}

	__JSONRead(key, value){
		switch(key){
			case "race": this.race = Database.getRaceByID(value); break;
			case "class": this.class = Database.getClassByID(value); break;
			default: Movable.__JSONRead.call(this, key, value); break;
		}
	}

	/**
	 * Runs when a Player is connected to this Mob.
	 * @param {Player} player Player connected to.
	 */
	login(){
	}

	/**
	 * Runs when a Player is disconnected from this Mob.
	 * @param {Player} player Player disconnected from.
	 */
	logout(){
	}

	/**
	 * Is this mob acting in the role of a player's character?
	 * @returns {boolean}
	 */
	isCharacter(){
		return this.playerData ? true : false;
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
}

/**
 * The player currently managing us.
 * @alias Mob#player
 * @type {?Player}
 */
Mob.prototype._player = null;

/**
 * This mob's player data.
 */
Mob.prototype.playerData = null;

/**
 * This mob's race.
 * @type {?Race}
 */
Mob.prototype.race = new Race();

/**
 * This mob's class.
 * @type {?Class}
 */
Mob.prototype.class = new Class();

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

/** @default "mob" */
Mob.prototype.keywords = "mob";

/** @default "Mob" */
Mob.prototype.display = "Mob";

module.exports = Mob;

Player = require("../mud/core/Player");

/**
 * Sole valid argument for `new Mob()`.
 * @typedef {Object} MobConstructorOptions
 * @property {MapObject} loc Location to move to.
 * @property {boolean} isCharacter Is this mob going to be used for a player's character?
 */
