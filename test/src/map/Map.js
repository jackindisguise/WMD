// npm includes
const expect = require("chai").expect;

// local includes
const Map = require("../../../src/mud/map/Map");
const Tile = require("../../../src/mud/map/Tile");

// testing
let map;
describe("[MAP]", function(){
	it("invalid constructor options", function(done){
		map = new Map();
		expect(map.size.width).to.equal(0);
		expect(map.size.height).to.equal(0);
		expect(map.size.levels).to.equal(0);

		map = new Map({});
		expect(map.size.width).to.equal(0);
		expect(map.size.height).to.equal(0);
		expect(map.size.levels).to.equal(0);

		map = new Map({"width":50});
		expect(map.size.width).to.equal(0);
		expect(map.size.height).to.equal(0);
		expect(map.size.levels).to.equal(0);

		map = new Map({width:50, height:50});
		expect(map.size.width).to.equal(0);
		expect(map.size.height).to.equal(0);
		expect(map.size.levels).to.equal(0);
		done();
	});

	it("valid constructor options (100x100x10 map)", function(done){
		map = new Map({width:100, height:100, levels:10, fill:Tile});
		expect(map.size.width).to.equal(100);
		expect(map.size.height).to.equal(100);
		expect(map.size.levels).to.equal(10);

		this.timeout(0);
		for(let z=0;z<map.size.levels;z++){
			for(let y=0;y<map.size.height;y++){
				for(let x=0;x<map.size.width;x++){
					let tile = map.getTileByXYZ(x,y,z);
					expect(tile instanceof Tile);
					expect(tile.x).to.equal(x);
					expect(tile.y).to.equal(y);
					expect(tile.z).to.equal(z);
				}
			}
		}

		done();
	});
});
