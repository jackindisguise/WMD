// npm includes
const expect = require("chai").expect;

// local includes
require("../../../src/lib/Object");
const MapObject = require("../../../src/mud/map/MapObject");

// testing
describe("[MAPOBJECT]", function(){
	it("constructor options", function(done){
		let object = new MapObject(); // no options
		expect(object.loc).to.equal(null);
		let object2 = new MapObject({}); // empty options
		expect(object2.loc).to.equal(null);
		let object3 = new MapObject({"loc":object2}); // valid location
		expect(object3.loc).to.equal(object2);
		let object4 = new MapObject({"loc":55}); // invalid location
		expect(object4.loc).to.equal(null);
		done();
	});

	it("loc relationship", function(done){
		let object = new MapObject();
		let object2 = new MapObject();

		// hard move
		object.loc = object2; // move onto another object
		expect(object2.contents.indexOf(object)).to.equal(0); // loc <-> contents link

		// hard move duplicate
		object.loc = object2; // move to same object
		expect(object.loc).to.equal(object2);

		// hard move to null
		object.loc = null;
		expect(object.loc).to.equal(null);
		expect(object2.contents.indexOf(object)).to.equal(-1); // loc <-> contents link

		// add to contents
		object2.add(object);
		expect(object.loc).to.equal(object2);
		expect(object2.contents.indexOf(object)).to.equal(0); // loc <-> contents link

		// add to contents duplicate
		object2.add(object);
		expect(object.loc).to.equal(object2);
		expect(object2.contents.indexOf(object)).to.equal(0); // loc <-> contents link

		// remove from contents
		object2.remove(object);
		expect(object.loc).to.equal(null);
		expect(object2.contents.indexOf(object)).to.equal(-1); // loc <-> contents link

		// remove from contents duplicate
		object2.remove(object);
		expect(object.loc).to.equal(null);
		expect(object2.contents.indexOf(object)).to.equal(-1); // loc <-> contents link
		done();
	});

	it("move", function(done){
		let object = new MapObject();
		let object2 = new MapObject();
		object.move(object2);
		expect(object.loc).to.equal(null);
		done();
	});

	it("JSON test", function(done){
		let object = new MapObject();
		object.display = "not racist";
		let json = object.__toJSON();
		expect(JSON.stringify(json)).to.equal("{\"constructor\":\"MapObject\",\"display\":\"not racist\"}");
		done();
	});
});