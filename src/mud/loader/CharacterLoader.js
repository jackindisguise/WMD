// node includes
const fs = require("fs");

// local includes
require("../../lib/Object");
require("../../lib/Array");
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const CharacterManager = require("../manager/CharacterManager");
const Character = require("../Character");

// load channels
module.exports = function(callback){
	Logger.info(_("> Loading characters..."));
	fs.readdir("./data/character", function(err, files){
		for(let file of files){
			let json = require("../../../data/character/"+file);
			Logger.info(_(">> Loading character '%s'", json.name));
			let character = new Character();
			character.__fromJSON(json);
			CharacterManager.add(character);
		}

		callback();
	});
};
