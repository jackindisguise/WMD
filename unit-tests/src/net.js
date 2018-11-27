// npm includes
var expect = require("chai").expect;
var http = require("http");
var io = require("socket.io-client");

// local includes
var MUD = require("../../src/core/MUD");
var Database = require("../../src/core/Database");
var _ = require("../../i18n");

describe("Net", function(){
    describe("Start", function(){
        it("start Express HTTP server", function(done){
            MUD.start(8000, done);
		});
	});

	describe("PUG", function(){
        it("PUG frontend received properly", function(done){
            // create a connection
            http.get("http://127.0.0.1:8000/", function(res){
                res.setEncoding("utf8");
                var raw = "";
                res.on("data", function(chunk){
                    raw += chunk;
                });

                res.on("end", function(){
                    expect(raw).to.equal('<!DOCTYPE html>\n<html>\n  <head>\n    <title>Node Page</title>\n    <link rel="stylesheet" type="text/css" href="/css/main.css">\n    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n    <link rel="icon" href="/favicon.ico" type="image/x-icon">\n    <link href="https://fonts.googleapis.com/css?family=Fira+Mono|Source+Code+Pro" rel="stylesheet">\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\n    <script src="/socket.io/socket.io.js"></script>\n    <script src="/src/js/socket.js"></script>\n    <script src="/src/js/output.js"></script>\n    <script src="/src/js/input.js"></script>\n    <script src="/src/js/main.js"></script>\n  </head>\n  <body>\n    <div id="header">mudengine\n      \n    </div>\n    <div id="MUD">\n      <div id="output"></div>\n      <div id="input">\n        <div class="wrapper">\n          <input id="command" placeholder="...">\n        </div>\n      </div>\n    </div>\n    <div id="status">mudengine v0.0.0</div>\n  </body>\n</html>');
                    done();
                });
            });
        });

        it("PUG frontend redirected properly", function(done){
            // create a connection
            http.get("http://127.0.0.1:8000/ldjkgjdhgkjdhfgkshg", function(res){
                res.setEncoding("utf8");
                var raw = "";
                res.on("data", function(chunk){
                    raw += chunk;
                });

                res.on("end", function(){
                    expect(raw).to.equal('Found. Redirecting to /');
                    done();
                });
            });
		});
	});

	describe("Player", function(){
		var player;
		it("connect player", function(done){
            var c = 0;
			function sequence(message){
                switch(c++){
                    case 0:
                        expect(message).to.equal(Database.greeting);
                        break;

                    case 1:
                        expect(message).to.equal(_("What's your name?"));
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

	describe("Stop", function(){
		it("stopping Express HTTP server", function(done){
			MUD.stop();
			done();
		});
	});
});
