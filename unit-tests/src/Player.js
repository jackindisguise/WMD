// npm includes
var expect = require("chai").expect;

// local includes
var Mob = require("../../src/map/Mob");
var Player = require("../../src/io/Player");

// testing
var mob = new Mob();
var player = new Player();
describe("Player", function(){
	it("Player <-> MapMob cross reference", function(done){
		mob.player = player;
		expect(mob.player).is.equal(player);
		expect(player.mob).is.equal(mob);
		mob.player = null;
		expect(mob.player).is.not.equal(player);
		expect(player.mob).is.not.equal(mob);
		done();
	});
});
