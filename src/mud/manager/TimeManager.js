// local includes
const PlayerManager = require("./PlayerManager");
const Communicate = require("../Communicate");

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
			let currentHP = player.mob.health, maxHP = player.mob.maxHealth;
			if(currentHP < maxHP){
				let heal = Math.floor(maxHP / 5);
				Communicate.regen({
					actor:player.mob,
					heal:heal,
					recipients:[player.mob]
				});

				player.mob.heal({health:heal});
			}
		}
	}
}

module.exports = TimeManager;