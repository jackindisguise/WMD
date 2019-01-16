const Ability = require("./Ability");

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
		if(this.mana) user.expend({mana:this.mana});
		if(this.energy) user.expend({energy:this.energy});
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
