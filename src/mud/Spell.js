const Ability = require("./Ability");

class Spell extends Ability{
	get chant(){
		let invocation = "";
		for(let i=0;i<this.display.length;i++) invocation += String.fromCharCode(this.display[i].charCodeAt()+1);
		return invocation;
	}
}

module.exports = Spell;
