// mocha order
require("./start");

// local includes
const MUD = require("../src/mud/core/MUD");

// testing goes here
describe("[STOP]", function(){
	it("stop MUD & HTTP server", function(done){
		MUD.stop();
		done();
	});
});
