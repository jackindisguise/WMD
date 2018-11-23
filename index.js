var config = require("./config.json");
var MUD = require("./src/core/MUD");
MUD.start(config.defaultPort ? config.defaultPort : 80);