let templates = [];

class TemplateManager{
	static get templates(){
		return templates;
	}

	static add(template){
		if(templates.indexOf(template) !== -1) return;
		templates.push(template);
	}

	static remove(template){
		let pos = templates.indexOf(template);
		if(pos === -1) return;
		templates.splice(pos, 1);
	}

	static getTemplateByName(name){
		for(let template of templates){
			if(template.name === name) return template;
		}
	}
}

module.exports = TemplateManager;
