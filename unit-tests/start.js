require("./setup");

// npm includes
var expect = require("chai").expect;

// local includes
var MUD = require("../src/core/MUD");

// testing goes here
describe(">>> Start", function(){
    it("Start MUD & HTTP Server", function(done){
        MUD.start(8000, done);
    });
});