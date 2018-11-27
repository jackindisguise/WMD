// node includes
var util = require("util");

// npm includes
var expect = require("chai").expect;
var http = require("http");
var io = require("socket.io-client");

// local includes
var _ = require("../../i18n");
var MUD = require("../../src/core/MUD");
var Mob = require("../../src/map/Mob");
var Client = require("../../src/io/Client");

// testing!
var player = MUD.connect(new Client());
player._client.id = "1";
player.mob = new Mob();
player.mob.name = "Player #1";

var player2 = MUD.connect(new Client());
player2._client.id = "2";
player2.mob = new Mob();
player2.mob.name = "Player #2";

player.sendLine = function(line){ player.emit("line", line); }; // lets us capture sendLine
player2.sendLine = function(line){ player2.emit("line", line); }; // lets us capture sendLine

describe("Command", function(){
    after(function(){
        player.disconnect();
        player2.disconnect();
    });

    it("OOC", function(done){
        var ooc = new (require("../../data/command/OOC"))();
        player2.once("line", function(line){ // listen to see if the other player receives it
            var msg = _("%s OOC '%s'", player.mob.name, "hello");
            expect(line).is.equal(msg);
            done();
        });

        ooc.run(player.mob, "ooc hello");
    });

    it("Who", function(done){
        var who = new (require("../../data/command/Who"))();
        player.once("line", function(line){
            expect(line).is.equal("Players Connected: 2\r\n[Player #1]\r\n[Player #2]");
            done();
        });

        who.run(player.mob, "who");
    });
});
