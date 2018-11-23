// npm includes
var winston = require("winston");

// local includes
var Logger = require("../src/util/Logger");

// disable logging
for(var i=0;i<Logger.transports.length;i++){
    var transport = Logger.transports[i];
    transport.silent = true;
}

//while(Logger.transports.length > 0){
//    Logger.remove(Logger.transports[0]);
//}
