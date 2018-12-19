// npm includes
var expect = require("chai").expect;

// local includes
var Communicate = require("../../src/mud/Communicate");
var Map = require("../../src/mud/map/Map");
var Mob = require("../../src/mud/map/Mob");

// testing
var map = new Map({width:1, height:1, levels:2});
var mob = new Mob({loc:map.getTileByXYZ(0,0,0)});
mob.name = "Actor";

var mob2 = new Mob({loc:map.getTileByXYZ(0,0,0)});
mob2.name = "Receiver";

describe("[COMMUNICATE]", function(){
    it("act", function(done){
        // finisher
        var c = 0;
        function d(){ if(--c===0) done(); }

        c++;
        mob.sendMessage = function(message){
            expect(message).to.equal("You say 'this is a test.'");
            d();
        };

        c++;
        mob2.sendMessage = function(message){
            expect(message).to.equal("Actor says 'this is a test.'");
            d();
        };

        var message = "this is a test";
        Communicate.act(mob, {firstPerson:"You say '$m.'", thirdPerson:"$n says '$m.'"}, [mob, mob2], {message:message});
    })
});
