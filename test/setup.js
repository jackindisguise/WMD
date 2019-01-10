// local includes
const Logger = require("../src/util/Logger");

// disable logging
Logger.transports[0].silent = true; // silence console transport