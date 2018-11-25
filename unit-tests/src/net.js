// npm includes
var expect = require("chai").expect;
var http = require("http");
var io = require("socket.io-client");

// local includes
var MUD = require("../../src/core/MUD");
var _ = require("../../i18n");

describe("Net", function(){
    describe("Start", function(){
        it("Express HTTP server start", function(done){
            MUD.start(8000);
            done();
		});
	});

	describe("PUG", function(){
        it("PUG frontend received properly", function(done){
            // create a connection
            http.get("http://127.0.0.1:8000", function(res){
                res.setEncoding("utf8");
                var raw = "";
                res.on("data", function(chunk){
                    raw += chunk;
                });

                res.on("end", function(){
                    expect(raw).to.equal('<!DOCTYPE html>\n<html>\n  <head>\n    <title>Node Page</title>\n    <link rel="stylesheet" type="text/css" href="/css/main.css">\n    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n    <link rel="icon" href="/favicon.ico" type="image/x-icon">\n    <link href="https://fonts.googleapis.com/css?family=Fira+Mono|Source+Code+Pro" rel="stylesheet">\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\n    <script src="/socket.io/socket.io.js"></script>\n    <script src="/src/js/socket.js"></script>\n    <script src="/src/js/output.js"></script>\n    <script src="/src/js/input.js"></script>\n    <script src="/src/js/main.js"></script>\n  </head>\n  <body>\n    <div id="header">mudengine\n      \n    </div>\n    <div id="MUD">\n      <div id="output"></div>\n      <div id="input">\n        <div class="wrapper">\n          <input id="command" placeholder="...">\n        </div>\n      </div>\n    </div>\n    <div id="status">mudengine v1.0.0</div>\n  </body>\n</html>');
                    done();
                });
            });
        });

        it("PUG frontend redirected properly", function(done){
            // create a connection
            http.get("http://127.0.0.1:8000/naniwoshiterno?", function(res){
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
		it("Connect player", function(done){
			function sequence(message){
				expect(message).to.equal(_("Client and player fully synchronized."));
				done();
			}
	
			player = io.connect("http://127.0.0.1:8000");
			player.on("message", sequence);
		});

		it("Disconnect player", function(done){
			player.close();
			expect(player.disconnected).to.equal(true);
			done();
		});
	});

	describe("Stop", function(){
		it("Express HTTP server stop", function(done){
			MUD.stop();
			done();
		});
	});
});
