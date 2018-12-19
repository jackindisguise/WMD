// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
require("../../lib/Array");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ChannelManager = require("../manager/ChannelManager");
var Channel = require("../Channel");

// load channels
module.exports = function(callback){
	Logger.info(_("> Loading channels..."));
	fs.readdir("./data/channel", function(err, files){
		for(var file of files){
			var json = require("../../../data/channel/"+file);
			Logger.info(_(">> Loading channel '%s'", json.name));
			var channel = new Channel();
			channel.__fromJSON(json);
			ChannelManager.add(channel);
		}

		callback();
	});
};
