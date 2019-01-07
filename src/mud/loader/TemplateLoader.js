// node includes
const fs = require("fs");

// local includes
require("../../lib/Object");
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const TemplateManager = require("../manager/TemplateManager");
const Template = require("../Template");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		let waiting = files.length;
		function next() { waiting--; if(waiting === 0) callback(); }
		for(let file of files){
			let _file = directory+"/"+file;
			let stats = fs.lstatSync(_file);
			if(stats.isDirectory()) deepSearch(_file, fileFun, next);
			else fileFun(_file, next);
		}
	});
}

module.exports = function(callback){
	Logger.info(_("> Loading templates..."));
	deepSearch("./data/template", function(file, next){
		let f = file.slice("./data/template".length); // cut off relative path from root
		let json = require("../../../data/template/"+f);
		Logger.info(_(">> Loading template for <%s>", json.name));
		let template = new Template();
		template.__fromJSON(json);
		TemplateManager.add(template);
		next();
	}, callback);
};
