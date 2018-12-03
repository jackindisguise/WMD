// mocha order
require("./PUG");

// node includes
var util = require("util");

// npm includes
var expect = require("chai").expect;
var io = require("socket.io-client");

// local includes
var _ = require("../i18n");
var MUD = require("../src/mud/core/MUD");
var Database = require("../src/mud/core/Database");

describe("Login", function(){
    var player;
    var sPlayer;
    MUD.once("connect", function(player) { sPlayer = player; });
    it("connect player", function(done){
        var c = 0;
        function sequence(message){
            switch(c++){
                case 0:
                    expect(message).to.equal(Database.greeting);
                    break;

                case 1:
                    expect(message).to.equal(_("What's your name?"));
                    player.emit("command", "Judas");
                    break;

                case 2:
                    var msg = _("------------------");
                    for(var race of Database.races){
                        msg += util.format("%s%s %s %s %s", "\r\n", "|", race.display.padLeft(14), "|", race.description);
                    }
            
                    msg += "\r\n";
                    msg += _("------------------");
                    expect(message).to.equal(msg);
                    break;

                case 3:
                    expect(message).to.equal(_("Enter a race:"));
                    player.emit("command", "human");
                    break;

                case 4:
                    var msg = _("------------------");
                    for(var _class of Database.classes){
                        msg += util.format(_("%s%s %s %s %s"), "\r\n", "|", _class.display.padLeft(14), "|", _class.description);
                    }
            
                    msg += "\r\n";
                    msg += _("------------------");
                    expect(message).to.equal(msg);
                    break;

                case 5:
                    expect(message).to.equal(_("Enter a class:"));
                    player.emit("command", "warrior");
                    break;

                case 6:
                    expect(message).to.equal(Database.motd);
                    break;

                case 7:
                    expect(message).to.equal(_("Press enter to continue..."));
                    player.emit("command", "");
                    break;

                case 8:
                    expect(message).to.equal(_("Welcome to the game, %s the %s %s!", sPlayer.mob.name, sPlayer.mob.race.name, sPlayer.mob.class.name));
                    player.emit("command", "blah");
                    break;

                    case 9:
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
