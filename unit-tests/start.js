require("./setup");

// npm includes
var expect = require("chai").expect;

// local includes
var Database = require("../src/mud/core/Database");
var MUD = require("../src/mud/core/MUD");

// testing goes here
describe(">>> Start", function(){
    it("Start MUD & HTTP Server", function(done){
        Database.load(function(){
            MUD.start(8000, function(){
                done();
            });
        });
    });
});