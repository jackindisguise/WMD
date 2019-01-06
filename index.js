// local includes
var _ = require("./i18n");
var Logger = require("./src/util/Logger");
var config = require("./config.json");
var Loader = require("./src/mud/loader/Loader");


// load full database
Loader(function(){
    // start MUD here
    Logger.info(_("Starting MUD..."));

    // local includes
    var MUD = require("./src/mud/core/MUD");

    // process settings
    var port = config.defaultPort ? config.defaultPort : 80;

    MUD.start(port, function(){
        Logger.info(_("The MUD is up and running.", port));
    });
});
