// mocha order
require("./login");

// npm includes
var expect = require("chai").expect;
var io = require("socket.io-client");

// local includes
var _ = require("../i18n");

describe("[COMMAND]", function(){
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
		// load finisher
		var c = 0;
		function d(){ if(--c === 0) done(); }

		c++;
		player = io.connect("http://127.0.0.1:8000");
		// ensure player connects first
		player.on("connect", function(){
			// connect other now
			c++;
			other = io.connect("http://127.0.0.1:8000");
			other.emit("command", "Second");
			other.emit("command", "human");
			other.emit("command", "warrior");
			other.emit("command", "motd");
			var m=0;
			other.on("message", function(message){ // fully connected
				m++;
				if(m===9){
					expect(message).is.equal(_("Welcome to the game, %s the %s %s!", "Second", "human", "warrior"));
					d();
				}
			});
		});

		player.emit("command", "First");
		player.emit("command", "human");
		player.emit("command", "warrior");
		player.emit("command", "motd");
		var m=0;
		player.on("message", function(message){ // fully connected
			m++;
			if(m===9){
				expect(message).is.equal(_("Welcome to the game, %s the %s %s!", "First", "human", "warrior"));
				d();
			}
		});
	});

	it("'who'", function(done){
		player.once("message", function(message){
			expect(message).is.equal("Players Connected: 2\r\n[First]\r\n[Second]");
			done();
		});

		player.emit("command", "who");
	});

	it("'quit'", function(done){
		player.once("message", function(message){
			expect(message).is.equal(_("Later, skater."));
			done();
		});

		player.emit("command", "quit");
	});
});
