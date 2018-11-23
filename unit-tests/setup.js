// npm includes
var winston = require("winston");

// local includes
var Logger = require("../src/util/Logger");

// disable logging
Logger.transports[0].silent = true; // silence console transport
