// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ObjectFactory = require("../factory/ObjectFactory");
var TemplateManager = require("../manager/TemplateManager");
var Template = require("../Template");

var _tmp = [];
function preloadTemplates(callback){
	Logger.info(_("> Preloading templates..."));
	fs.readdir("./data/template", function(err, files){
		for(var file of files){
			var _template = require("../../../data/template/"+file);
			var template = new Template();
			if(_template.obj.contents) _tmp[template.uuid] = _template.obj.contents;
			template.__fromJSON(_template);
			TemplateManager.add(template);
			if(_tmp[template.uuid]) Logger.info(_(">> Partially loaded template for <%s> '%s'", template.obj.constructor.name, template.obj.name));
			else Logger.info(_(">> Loaded full template for <%s> '%s'", template.obj.constructor.name, template.obj.name));
		}

		Logger.info(_("< Templates preloaded!"));
		callback();
	});
}

function loadTemplates(callback){
	Logger.info(_("> Finishing templates..."));
	for(var template of TemplateManager.templates){
		var contents = _tmp[template.uuid];
		if(!contents) continue;
		for(var json of contents){
			var obj = ObjectFactory.loadFromJSON(json);
			if(obj) obj.loc = template.obj;
		}

		delete template._contents;
		Logger.info(_(">> Finished loading template for <%s> '%s'", template.obj.constructor.name, template.obj.name));
	}

	Logger.info("< Templates finished!");
	callback();
}

module.exports = function(callback){
	preloadTemplates(function(){
		loadTemplates(callback);
	});
};
