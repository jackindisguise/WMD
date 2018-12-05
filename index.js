// local includes
var config = require("./config.json");
var Database = require("./src/mud/core/Database");
var MUD = require("./src/mud/core/MUD");
var Logger = require("./src/util/Logger");
var _ = require("./i18n");

// process settings
var port = config.defaultPort ? config.defaultPort : 80;

// load database
Logger.info("Loading database...");
Database.load(function(){
    Logger.info("Loaded database...");

    // start MUD
    MUD.start(port, function(){
        Logger.info(_("The MUD is up and running.", port));
    });
})
