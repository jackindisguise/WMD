// local includes
const _ = require("./i18n");
const Logger = require("./src/util/Logger");
const config = require("./config.json");
const Loader = require("./src/mud/loader/Loader");


// load full database
Loader(function(){
    // start MUD here
    Logger.info(_("Starting MUD..."));

    // local includes
    const MUD = require("./src/mud/core/MUD");

    // process settings
    let port = config.defaultPort ? config.defaultPort : 80;

    MUD.start(port, function(){
        Logger.info(_("The MUD is up and running.", port));
    });
});
