require("./setup");

// local includes
const Loader = require("../src/mud/loader/Loader");

// testing goes here
describe("[START]", function(){
	it("start MUD & HTTP server", function(done){
		Loader(function(){
			// local includes
			let MUD = require("../src/mud/core/MUD");
			MUD.start(8000, done);
		});
	});
});
