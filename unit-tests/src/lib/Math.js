// npm includes
var expect = require("chai").expect;

// local includes
require("../../../src/lib/Math");

// MMath testing goes here!
describe("Math", function(){
	it("lerp", function(done){
		expect(Math.lerp(0,1,0.5)).to.equal(0.5);
		done();
	});

	it("rangeInt", function(done){
		expect(Math.rangeInt(8,44)).to.be.within(8,44);
		done();
	});

	it("probability", function(done){
		expect(Math.probability(0)).to.equal(false);
		expect(Math.probability(1)).to.equal(true);
		expect(typeof Math.probability(0.5)).to.equal("boolean");
		done();
	});

	it("roll / rollString", function(done){
		expect(Math.roll(2,6,15)).to.be.within(17, 27);
		expect(Math.rollString("15d5+10")).to.be.within(25,85);
		expect(Math.rollString("15d5-10")).to.be.within(5,65);
		expect(Math.rollString("1dd5+1")).to.equal(null);
		done();
	});
});