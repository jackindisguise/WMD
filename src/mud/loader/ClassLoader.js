// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ClassManager = require("../manager/ClassManager");
var Class = require("../Class");

// class loader
module.exports = function(callback){
	Logger.info(_("> Loading classes..."));
	fs.readdir("./data/class", function(err, files){
		for(var file of files){
			var json = require("../../../data/class/"+file);
			var cLass = new Class();
			cLass.__fromJSON(json);
			ClassManager.add(cLass);
			Logger.info(_(">> Loaded Class '%s'", cLass.name));
		}

		Logger.info(_("< Classes loaded!"));
		callback();
	});
};
