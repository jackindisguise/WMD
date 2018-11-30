// npm includes
var expect = require("chai").expect;

// local includes
var Act = require("../../src/mud/Act");
var Map = require("../../src/map/Map");
var Mob = require("../../src/map/Mob");
var Player = require("../../src/mud/core/Player");

// testing
var map = new Map({width:1, height:1, levels:2});

var mob = new Mob({loc:map.getTileByXYZ(0,0,0)});
mob.name = "Player";
var player = new Player();
player._mob = mob;
player.sendMessage = function(message, category) { this.emit("message", message); }

var mob2 = new Mob({loc:map.getTileByXYZ(0,0,0)});
mob2.name = "Other";
var player2 = new Player();
player2._mob = mob2;
player2.sendMessage = function(message, category) { this.emit("message", message); }

describe("Act", function(){
    it("#1", function(done){
        var c = 0;
        function d(){
            c--;
            if(c===0) done();
        }

        c++;
        player.once("message", function(message){
            expect(message).to.equal("You say 'this is a test.'");
            d();
        })

        player2.once("message", function(message){
            expect(message).to.equal("Other says 'this is a test.'");
            d();
        })
        var message = "this is a test";
        Act.act(player, {firstPerson:"You say '$m.'", thirdPerson:"$n says '$m.'"}, [player, player2], {victim:player2, message:message});
    })
});
