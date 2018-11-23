// npm includes
var expect = require("chai").expect;

// local includes
var Map = require("../../src/map/Map");
var Tile = require("../../src/map/Tile");
var MapObject = require("../../src/map/MapObject");
var Movable = require("../../src/map/Movable");

// testing
var movable;
var map = new Map({width:100, height:100, levels:10});
var tile = map.getTileByXYZ(0,0,0);
var tile2 = map.getTileByXYZ(1,0,0);
var tile3 = map.getTileByXYZ(2,0,0);
var noenter = map.getTileByXYZ(3,0,0);
noenter.canEnter = function(mapobject){ return false; }
describe("Movable", function(){
	it("Create a new movable", function(done){
		movable = new Movable();
		done();
	});

	it("Informal move to tile", function(done){
		movable.loc = tile;
		expect(movable.loc).to.equal(tile);
		expect(tile.contents[0]).to.equal(movable);
		expect(movable.x).to.equal(0);
		expect(movable.y).to.equal(0);
		expect(movable.z).to.equal(0);
		done();
	});

	it("Move by adding to other tile's contents", function(done){
		tile2.add(movable);
		expect(movable.loc).to.equal(tile2);
		expect(tile2.contents[0]).to.equal(movable);
		expect(tile.contents[0]).to.not.equal(movable);
		done();
	});

	it("Legal formal move", function(done){
		movable.move(tile3);
		expect(movable.loc).to.equal(tile3);
		expect(tile2.contents[0]).to.not.equal(movable);
		expect(tile3.contents[0]).to.equal(movable);
		done();
	});

	it("Illegal formal move", function(done){
		movable.move(noenter);
		expect(movable.loc).to.not.equal(noenter);
		expect(tile3.contents[0]).to.equal(movable);
		expect(noenter.contents[0]).to.not.equal(movable);
		done();
	});

	it("Bypass formal move rules with informal move", function(done){
		movable.loc = noenter;
		expect(movable.loc).to.equal(noenter);
		expect(tile3.contents[0]).to.not.equal(movable);
		expect(noenter.contents[0]).to.equal(movable);
		done();
	});
});
