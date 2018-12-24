var models = [];

class ModelManager{
	static get models(){
		return models;
	}

	static add(model){
		if(models.indexOf(model) != -1) return;
		models.push(model);
	}

	static remove(model){
		var pos = models.indexOf(model);
		if(pos == -1) return;
		models.splice(pos, 1);
	}

	static getModelByName(name){
		for(var model of models){
			if(model.name === name) return model;
		}
	}
}

module.exports = ModelManager;
