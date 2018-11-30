// mocha order
require("./0net");

// node includes
var util = require("util");

// npm includes
var expect = require("chai").expect;
var http = require("http");
var io = require("socket.io-client");

// local includes
var _ = require("../i18n");
var MUD = require("../src/core/MUD");
var Database = require("../src/core/Database");
var Player = require("../src/core/Player");
var Mob = require("../src/map/Mob");
var Client = require("../src/io/Client");

describe("Command", function(){
    var player, other;
    afterEach(function(){ // gets rid of any false positives
        player.removeAllListeners("message");
        other.removeAllListeners("message");
    });

    after(function(){ // close test clients
        player.close();
        other.close();
    });

    it("initialize test clients", function(done){
        var c = 2;
        function d(){ if(--c == 0) done(); }
        player = io.connect("http://127.0.0.1:8000");
        player.emit("command", "Player");
        player.emit("command", "human");
        player.emit("command", "warrior");
        player.emit("command", "motd");
        player.on("message", function(message, category){ // fully connected
            if(message == _("Welcome to the game, %s the %s %s!", "Player", "Human", "Warrior")) d();
        });

        other = io.connect("http://127.0.0.1:8000");
        other.emit("command", "Other");
        other.emit("command", "human");
        other.emit("command", "warrior");
        other.emit("command", "motd");
        other.on("message", function(message, category){ // fully connected
            if(message == _("Welcome to the game, %s the %s %s!", "Other", "Human", "Warrior")) d();
        });
    });

    it("input: ooc", function(done){
        player.once("message", function(message, category){
            expect(message).is.equal(_("What do you want to say?"));
            done();
        });

        player.emit("command", "ooc");
    });

    it("input: ooc hello", function(done){
        var c=0;
        function d(){
            c--;
            if(c == 0) done();
        }

        c++;
        player.once("message", function(message, category){
            expect(message).is.equal("You OOC: hello");
            d();
        });

        c++;
        other.once("message", function(message, category){
            expect(message).is.equal("Player OOC: hello");
            d();
        });

        player.emit("command", "ooc hello");
    });

    it("input: whisper", function(done){
        player.once("message", function(message, category){
            expect(message).is.equal(_("Whisper what to whom?"));
            done();
        });

        player.emit("command", "whisper");
    });

    it("input: whisper other", function(done){
        player.once("message", function(message, category){
            expect(message).is.equal(_("Sure, but what do you want to whisper them?"));
            done();
        });

        player.emit("command", "whisper other");
    });

    it("input: whisper other hello", function(done){
        var c=0;
        function d(){
            c--;
            if(c == 0) done();
        }

        c++;
        player.once("message", function(message, category){
            expect(message).is.equal("You whisper to Other: hello");
            d();
        });

        other.once("message", function(message, category){
            expect(message).is.equal("Player whispers to you: hello");
            d();
        })

        player.emit("command", "whisper other hello");
    });

    it("input: who", function(done){
        player.once("message", function(message, category){
            expect(message).is.equal("Players Connected: 2\r\n[Player]\r\n[Other]");
            done();
        });

        player.emit("command", "who");
    });

    it("input: quit", function(done){
        player.once("message", function(message, category){
            expect(message).is.equal("Later, skater.");
            done();
        });

        player.emit("command", "quit");
    });
});
