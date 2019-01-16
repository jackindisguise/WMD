// local includes
const PlayerManager = require("./PlayerManager");
const Communicate = require("../Communicate");
const Message = require("../Message");

// local variables
let intID = null;

class TimeManager{
	static start(){
		intID = setInterval(TimeManager.update, 30000); // update every 30 seconds
	}

	static stop(){
		if(intID) clearInterval(intID);
	}

	static update(){
		for(let player of PlayerManager.players){
			if(!player.mob) continue; // need a mob to regenerate
			if(player.mob.fighting) continue; // fighters don't get to regenerate

			// current stat values
			let currentHP = player.mob.health, maxHP = player.mob.maxHealth;
			let currentMP = player.mob.mana, maxMP = player.mob.maxMana;
			let currentEP = player.mob.energy, maxEP = player.mob.maxEnergy;
			if(currentHP === maxHP && currentMP === maxMP && currentEP === maxEP) continue; // already maxed out

			// regen options
			let health = 0,
				mana = 0,
				energy = 0,
				suffixes = [],
				commOptions = {actor:player.mob, recipients:[player.mob], suffix:suffixes},
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
				player.mob.heal(regOptions);
			}
		}
	}
}

module.exports = TimeManager;