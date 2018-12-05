var _templates = [];

class TemplateManager{
	static get templates(){
		return _templates;
	}

	static set templates(template){
		_templates = template;
	}

	static add(template){
		if(_templates.indexOf(template) != -1) return;
		_templates.push(template);
	}

	static remove(template){
		var pos = _templates.indexOf(template);
		if(pos == -1) return;
		_templates.splice(pos, 1);
	}

	static getTemplateByID(id){
		for(var template of _templates){
			if(template.id === id) return template;
		}
	}
}

module.exports = TemplateManager;
