// mocha order
require("./start");

// npm includes
var expect = require("chai").expect;

// local includes
var MUD = require("../src/mud/core/MUD");

// testing goes here
describe("<< Stop", function(){
    it("Stop MUD & HTTP Server", function(done){
        MUD.stop();
        done();
    });
});
