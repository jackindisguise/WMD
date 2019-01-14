// mocha order
require("./PUG");

// node includes
const util = require("util");
const fs = require("fs");

// npm includes
const expect = require("chai").expect;
const io = require("socket.io-client");

// local includes
const _ = require("../i18n");
const RaceManager = require("../src/mud/manager/RaceManager");
const ClassManager = require("../src/mud/manager/ClassManager");
const PlayerManager = require("../src/mud/manager/PlayerManager");

// text data
const greeting = fs.readFileSync("./data/reference/greeting.txt", "utf8");
const motd = fs.readFileSync("./data/reference/motd.txt", "utf8");

describe("[LOGIN]", function(){
	let player;
	let sPlayer;
	it("connect player", function(done){
		let c = 0;
		let msg;
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
				msg = "------------------";
				for(let race of RaceManager.races){
					msg += util.format("%s%s %s %s %s", "\r\n", "|", race.display.padLeft(14), "|", race.description);
				}
            
				msg += "\r\n";
				msg += "------------------";
				expect(message).to.equal(msg);
				break;

			case 3:
				expect(message).to.equal(_("Enter a race:"));
				player.emit("command", "human");
				break;

			case 4:
				msg = "------------------";
				for(let _class of ClassManager.classes){
					msg += util.format("%s%s %s %s %s", "\r\n", "|", _class.display.padLeft(14), "|", _class.description);
				}
            
				msg += "\r\n";
				msg += "------------------";
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
				msg = "{Ca big beautiful meadow{x ({Y0,0,0{x)\r\n    {cIt's a big beautiful meadow. What more could you ask for?{x\r\n\r\n[Exits: south east southeast]\r\n    a rock thrower\r\n    Judas";
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
