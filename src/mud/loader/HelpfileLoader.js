// node includes
const fs = require("fs");

// npm includes
const yaml = require("js-yaml");

// local includes
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const HelpfileManager = require("../manager/HelpfileManager");

// load channels
module.exports = function(callback){
	let count = 0;
	function done() {
		count--;
		if(count === 0) callback();
	}

	Logger.info(_("> Loading helpfile..."));
	fs.readdir("./data/help", function(err, files){
		if(err) return;
		for(let file of files){
			count++;
			fs.readFile("./data/help/"+file, "utf8", function(err, data){
				let yml = yaml.load(data);
				Logger.info(_(">> Loading helpfile '%s'", yml.name));
				HelpfileManager.add(yml);
				done();
			});
		}
	});
};
