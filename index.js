// local includes
var _ = require("./i18n");
var Logger = require("./src/util/Logger");
var config = require("./config.json");
var MUD = require("./src/mud/core/MUD");
var Loader = require("./src/mud/loader/Loader");

// process settings
var port = config.defaultPort ? config.defaultPort : 80;

// load full database
Loader(function(){
    // start MUD here
    Logger.info(_("Starting MUD..."));

    MUD.start(port, function(){
        Logger.info(_("The MUD is up and running.", port));
    });
});
