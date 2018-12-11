var _models = [];

class ModelManager{
	static get models(){
		return _models;
	}

	static add(model){
		if(_models.indexOf(model) != -1) return;
		_models.push(model);
	}

	static remove(model){
		var pos = _models.indexOf(model);
		if(pos == -1) return;
		_models.splice(pos, 1);
	}

	static getModelByName(name){
		for(var model of _models){
			if(model.name === name) return model;
		}
	}
}

module.exports = ModelManager;
