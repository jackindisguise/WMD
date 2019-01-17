let helpfiles = [];

class HelpfileManager{
	static get helpfiles(){
		return helpfiles;
	}

	static add(helpfile){
		if(helpfiles.indexOf(helpfile) !== -1) return;
		helpfiles.push(helpfile);
	}

	static remove(helpfile){
		let pos = helpfiles.indexOf(helpfile);
		if(pos === -1) return;
		helpfiles.splice(pos, 1);
	}

	static getHelpfileByKeywords(keywords){
		for(let helpfile of helpfiles){
			if(helpfile.keywords.matchKeywords(keywords)) return helpfile;
		}
	}
}

module.exports = HelpfileManager;
