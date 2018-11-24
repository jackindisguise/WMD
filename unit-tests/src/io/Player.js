// npm includes
var expect = require("chai").expect;

// local includes
var Mob = require("../../../src/map/Mob");
var Player = require("../../../src/core/Player");

// testing
describe("Player", function(){
	it("Player constructor options", function(done){
		var mob = new Mob();
		var p = new Player({mob:mob});
		expect(p.mob).is.equal(mob);
		expect(mob.player).is.equal(p);
		done();
	});

	it("Player <-> Mob cross reference", function(done){
		var mob = new Mob();
		var player = new Player();
		mob.player = player;
		expect(mob.player).is.equal(player);
		expect(player.mob).is.equal(mob);
		mob.player = null;
		expect(mob.player).is.not.equal(player);
		expect(player.mob).is.not.equal(mob);
		done();
	});
});
