// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ObjectFactory = require("../factory/ObjectFactory");
var TemplateManager = require("../manager/TemplateManager");
var Template = require("../Template");

var _tmp = [];
function preloadTemplates(callback){
	Logger.info(_("Preloading templates..."));
	fs.readdir("./data/template", function(err, files){
		for(var file of files){
			var _template = require("../../../data/template/"+file);
			var template = new Template();
			if(_template.obj.contents) template._contents = _template.obj.contents;
			template.__fromJSON(_template);
			TemplateManager.add(template);
			if(template._contents) Logger.info(_("Loaded half of template for <%s> '%s'", template.obj.constructor.name, template.obj.name));
			else Logger.info(_("Loaded full template for <%s> '%s'", template.obj.constructor.name, template.obj.name));
		}

		callback();
	});
}

function loadTemplates(callback){
	Logger.info(_("Finish templates..."));
	for(var template of TemplateManager.templates){
		var contents = template._contents;
		if(!contents) continue;
		for(var json of contents){
			var obj = ObjectFactory.loadFromJSON(json);
			if(obj) obj.loc = template.obj;
		}

		delete template._contents;
		Logger.info(_("Finished loading template for <%s> '%s'", template.obj.constructor.name, template.obj.name));
	}

	callback();
}

module.exports = function(callback){
	preloadTemplates(function(){
		loadTemplates(callback);
	});
};
