// local includes
var config = require("./config.json");
var MUD = require("./src/mud/core/MUD");
var Logger = require("./src/util/Logger");
var _ = require("./i18n");

// process settings
var port = config.defaultPort ? config.defaultPort : 80;

// start MUD
MUD.start(port, function(){
    Logger.info(_("The MUD is up and running.", port));
});
