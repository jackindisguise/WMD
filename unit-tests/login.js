// mocha order
require("./PUG");

// node includes
var util = require("util");
var fs = require("fs");

// npm includes
var expect = require("chai").expect;
var io = require("socket.io-client");

// local includes
var _ = require("../i18n");
var MUD = require("../src/mud/core/MUD");
var RaceManager = require("../src/mud/manager/RaceManager");
var ClassManager = require("../src/mud/manager/ClassManager");
var PlayerManager = require("../src/mud/manager/PlayerManager");

// text data
var greeting = fs.readFileSync("./data/reference/greeting.txt", "utf8");
var motd = fs.readFileSync("./data/reference/motd.txt", "utf8");

describe("[LOGIN]", function(){
    var player;
    var sPlayer;
    it("connect player", function(done){
        var c = 0;
        function sequence(message){
            switch(c++){
                case 0:
                    sPlayer = PlayerManager.players[0];
                    expect(message).to.equal(greeting);
                    break;

                case 1:
                    expect(message).to.equal(_("What's your name?"));
                    player.emit("command", "Judas");
                    break;

                case 2:
                    var msg = "{y------------------";
                    for(var race of RaceManager.races){
                        msg += util.format("%s%s {Y%s {y%s {x%s{y", "\r\n", "|", race.display.padLeft(14), "|", race.description);
                    }
            
                    msg += "\r\n";
                    msg += "------------------{x";
                    expect(message).to.equal(msg);
                    break;

                case 3:
                    expect(message).to.equal(_("Enter a race:"));
                    player.emit("command", "human");
                    break;

                case 4:
                    var msg = "{c------------------";
                    for(var _class of ClassManager.classes){
                        msg += util.format("%s%s {C%s {c%s {x%s{c", "\r\n", "|", _class.display.padLeft(14), "|", _class.description);
                    }
            
                    msg += "\r\n";
                    msg += "------------------{x";
                    expect(message).to.equal(msg);
                    break;

                case 5:
                    expect(message).to.equal(_("Enter a class:"));
                    player.emit("command", "warrior");
                    break;

                case 6:
                    expect(message).to.equal(motd);
                    break;

                case 7:
                    expect(message).to.equal(_("Press enter to continue..."));
                    player.emit("command", "");
                    break;

                case 8:
                    expect(message).to.equal(_("Welcome to the game, %s the %s %s!", sPlayer.mob.name, sPlayer.mob.race.display, sPlayer.mob.class.display));
                    break;

                case 9:
                    var msg = "{Ca big beautiful meadow\r\n    {cIt\'s a big beautiful meadow. What more could you ask for?{x\r\n\r\n{c[{CExits: {Wsouth east southeast{c]{x\r\n    a Rock Thrower\r\n    Judas";
                    expect(message).to.equal(msg);
                    player.emit("command", "blah");
                    break;

                case 10:
                    expect(message).to.equal(_("Do what, now?"));
                    done();
                    break;
            }
        }

        player = io.connect("http://127.0.0.1:8000");
        player.on("message", sequence);
    });

    it("disconnect player", function(done){
        player.close();
        expect(player.disconnected).to.equal(true);
        done();
    });
});
