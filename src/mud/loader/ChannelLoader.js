// node includes
const fs = require("fs");

// local includes
require("../../lib/Object");
require("../../lib/Array");
const _ = require("../../../i18n");
const Logger = require("../../util/Logger");
const ChannelManager = require("../manager/ChannelManager");
const Channel = require("../Channel");

// load channels
module.exports = function(callback){
	Logger.info(_("> Loading channels..."));
	fs.readdir("./data/channel", function(err, files){
		for(let file of files){
			let json = require("../../../data/channel/"+file);
			Logger.info(_(">> Loading channel '%s'", json.name));
			let channel = new Channel();
			channel.__fromJSON(json);
			ChannelManager.add(channel);
		}

		callback();
	});
};
