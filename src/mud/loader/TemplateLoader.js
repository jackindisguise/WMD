// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var TemplateManager = require("../manager/TemplateManager");
var Template = require("../Template");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		var waiting = files.length;
		function next() { waiting--; if(waiting === 0) callback(); }
		for(var file of files){
			var _file = directory+"/"+file;
			var stats = fs.lstatSync(_file);
			if(stats.isDirectory()) deepSearch(_file, fileFun, next);
			else fileFun(_file, next);
		}
	});
}

module.exports = function(callback){
	Logger.info(_("> Loading templates..."));
	deepSearch("./data/template", function(file, next){
		var f = file.slice("./data/template".length); // cut off relative path from root
		var _template = require("../../../data/template/"+f);
		var template = new Template();
		template.__fromJSON(_template);
		TemplateManager.add(template);
		Logger.info(_(">> Loaded template for <%s>", template.name));
		next();
	}, callback);
};
