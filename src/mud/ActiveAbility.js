const Ability = require("./Ability");
const Communicate = require("./Communicate");
const Message = require("./Message");

class ActiveAbility extends Ability{
	check(user){
		if(this.mana && user.mana < this.mana){
			user.sendLine("You don't have enough mana.");
			return false;
		}

		if(this.energy && user.energy < this.energy){
			user.sendLine("You don't have enough energy.");
			return false;
		}

		return true;
	}

	expend(user){
		if(this.mana){
			let manaAfter = user.mana - this.mana;
			Communicate.act({
				actor:user,
				recipients:[user],
				message:Message.ExpendMana,
				suffix:Message.ExpendManaSuffix,
				mana:this.mana,
				manaAfter:manaAfter
			});

			user.expend({mana:this.mana});
		}

		if(this.energy){
			let energyAfter = user.energy - this.energy;
			Communicate.act({
				actor:user,
				recipients:[user],
				message:Message.ExpendEnergy,
				suffix:Message.ExpendEnergySuffix,
				energy:this.energy,
				energyAfter:energyAfter
			});

			user.expend({energy:this.energy});
		}
	}

	busy(user){
		if(this.delay) user.busy(this.delay);
	}
}

Ability.prototype.name = null;
Ability.prototype.display = null;
Ability.prototype.keywords = null;
Ability.prototype.energy = null;
Ability.prototype.mana = null;
Ability.prototype.delay = null;

module.exports = ActiveAbility;
