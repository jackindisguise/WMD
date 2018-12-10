require("./setup");

// npm includes
var expect = require("chai").expect;

// local includes
var MUD = require("../src/mud/core/MUD");
var Loader = require("../src/mud/loader/Loader");

// testing goes here
describe(">> Start", function(){
    it("Start MUD & HTTP Server", function(done){
        Loader(function(){
            MUD.start(8000, done);
        });
    });
});