// npm includes
const expect = require("chai").expect;

// local includes
const Communicate = require("../../src/mud/Communicate");
const Map = require("../../src/mud/map/Map");
const Mob = require("../../src/mud/map/Mob");

// testing
let map = new Map({width:1, height:1, levels:2});
let mob = new Mob({loc:map.getTileByXYZ(0,0,0)});
mob.name = "Actor";

let mob2 = new Mob({loc:map.getTileByXYZ(0,0,0)});
mob2.name = "Receiver";

describe("[COMMUNICATE]", function(){
	it("act", function(done){
		// finisher
		let c = 0;
		function d(){ if(--c===0) done(); }

		c++;
		mob.sendMessage = function(message){
			expect(message).to.equal("You say 'this is a test.'");
			d();
		};

		c++;
		mob2.sendMessage = function(message){
			expect(message).to.equal("Actor says 'this is a test.'");
			d();
		};

		let content = "this is a test";
		Communicate.act({
			actor: mob,
			recipients:[mob, mob2],
			message:{firstPerson:"You say '${content}.'", thirdPerson:"${actor} says '${content}.'"},
			content:content
		});
	});
});
