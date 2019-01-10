require("../../start");

// npm includes
const expect = require("chai").expect;

// local includes
const Mob = require("../../../src/mud/map/Mob");
const Player = require("../../../src/mud/io/Player");

// testing
describe("[PLAYER]", function(){
	it("constructor options", function(done){
		let mob = new Mob();
		let p = new Player({mob:mob});
		expect(p.mob).is.equal(mob);
		expect(mob.player).is.equal(p);
		p.mob = null;
		done();
	});

	it("Player <-> Mob cross reference", function(done){
		let mob = new Mob();
		let player = new Player();
		mob.player = player;
		expect(mob.player).is.equal(player);
		expect(player.mob).is.equal(mob);
		mob.player = null;
		expect(mob.player).is.not.equal(player);
		expect(player.mob).is.not.equal(mob);
		done();
	});
});
