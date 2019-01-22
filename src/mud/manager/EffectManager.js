let effects = [];

class EffectManager{
	static get effects(){
		return effects;
	}
	static add(effect){
		if(effects.indexOf(effect) !== -1) return;
		effects.push(effect);
	}

	static remove(effects){
		let pos = effects.indexOf(effects);
		if(pos === -1) return;
		effects.splice(pos, 1);
	}

	static getEffectByName(name){
		for(let effect of effects){
			if(effect.name === name) return effect;
		}
	}
}

module.exports = EffectManager;
