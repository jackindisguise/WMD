let abilities = [];

class AbilityManager{
	static get abilities(){
		return abilities;
	}
	static add(ability){
		if(abilities.indexOf(ability) !== -1) return;
		abilities.push(ability);
	}

	static remove(ability){
		let pos = abilities.indexOf(ability);
		if(pos === -1) return;
		abilities.splice(pos, 1);
	}

	static getAbilityByName(name){
		for(let ability of abilities){
			if(ability.name === name) return ability;
		}
	}
}

module.exports = AbilityManager;
