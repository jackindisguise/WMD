const ActiveAbility = require("./ActiveAbility");

class Spell extends ActiveAbility{
	get chant(){
		let invocation = "";
		for(let i=0;i<this.display.length;i++) {
			if(this.display[i] === " ") invocation += " ";
			else invocation += String.fromCharCode(this.display[i].charCodeAt()+1);
		}

		return invocation;
	}
}

module.exports = Spell;
