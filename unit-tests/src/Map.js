// npm includes
var expect = require("chai").expect;

// local includes
var Map = require("../../src/map/Map");
var MapTile = require("../../src/map/MapTile");
var MapObject = require("../../src/map/MapObject");

describe("Creating Map", function(){
	it("Creating 100x100x1 map", function(done){
		var map = new Map(100,100,1);
		expect(map.width).to.equal(100);
		expect(map.height).to.equal(100);
		expect(map.levels).to.equal(1);
		expect(map.getSize()).to.equal({width:100,height:100,levels:1});
		done();
	});
});