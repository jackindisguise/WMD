// npm includes
var winston = require("winston");

// local includes
var Logger = require("../src/util/Logger");

// disable logging
Logger.remove(winston.transports.Console);
Logger.remove(winston.transports.File);
