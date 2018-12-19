// mocha order
require("./start");

// npm includes
var expect = require("chai").expect;

// local includes
var MUD = require("../src/mud/core/MUD");

// testing goes here
describe("[STOP]", function(){
    it("stop MUD & HTTP server", function(done){
        MUD.stop();
        done();
    });
});
