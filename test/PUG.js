// mocha order
require("./start");

// node includes
const util = require("util");

// npm includes
const expect = require("chai").expect;
const http = require("http");

// local includes
const _package = require("../package.json");

// test goes here
describe("[PUG]", function(){
	it("frontend received properly", function(done){
		// create a connection
		http.get("http://127.0.0.1:8000/", function(res){
			res.setEncoding("utf8");
			let raw = "";
			res.on("data", function(chunk){
				raw += chunk;
			});

			res.on("end", function(){
				expect(raw).to.equal(util.format("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Node Page</title>\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/css/main.css\">\n    <link rel=\"shortcut icon\" href=\"/favicon.ico\" type=\"image/x-icon\">\n    <link rel=\"icon\" href=\"/favicon.ico\" type=\"image/x-icon\">\n    <link href=\"https://fonts.googleapis.com/css?family=Fira+Mono|Source+Code+Pro\" rel=\"stylesheet\">\n    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n    <script src=\"/socket.io/socket.io.js\"></script>\n    <script src=\"/src/js/socket.js\"></script>\n    <script src=\"/src/js/output.js\"></script>\n    <script src=\"/src/js/input.js\"></script>\n    <script src=\"/src/js/main.js\"></script>\n  </head>\n  <body>\n    <div id=\"header\">wmd-mud\n      \n    </div>\n    <div id=\"MUD\">\n      <div id=\"wrapper\">\n        <div id=\"output\"></div>\n      </div>\n      <div id=\"input\">\n        <div class=\"wrapper\">\n          <input id=\"command\" placeholder=\"...\">\n        </div>\n      </div>\n    </div>\n    <div id=\"status\">wmd-mud v%s</div>\n  </body>\n</html>", _package.version));
				done();
			});
		});
	});

	it("frontend redirected properly", function(done){
		// create a connection
		http.get("http://127.0.0.1:8000/ldjkgjdhgkjdhfgkshg", function(res){
			res.setEncoding("utf8");
			let raw = "";
			res.on("data", function(chunk){
				raw += chunk;
			});

			res.on("end", function(){
				expect(raw).to.equal("Found. Redirecting to /");
				done();
			});
		});
	});
});