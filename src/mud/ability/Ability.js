class Ability{
	constructor(options){
		if(options){
			if(options.name) this.name = options.name;
			if(options.keywords) this.keywords = options.keywords;
		}
	}
}

Ability.prototype.name = null;
Ability.prototype.display = null;
Ability.prototype.keywords = null;

module.exports = Ability;
