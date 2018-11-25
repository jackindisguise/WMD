// npm includes
var expect = require("chai").expect;

// local includes
require("../../../src/lib/Object");
var Map = require("../../../src/map/Map");
var MapObject = require("../../../src/map/MapObject");

// testing
describe("MapObject", function(){
    it("MapObject constructor options", function(done){
        var object = new MapObject(); // no options
        expect(object.loc).to.equal(null);
        var object2 = new MapObject({}); // empty options
        expect(object2.loc).to.equal(null);
        var object3 = new MapObject({"loc":object2}); // valid location
        expect(object3.loc).to.equal(object2);
        var object4 = new MapObject({"loc":55}); // invalid location
        expect(object4.loc).to.equal(null);
        done();
    });

    it("MapObject loc relationship", function(done){
        var object = new MapObject();
        var object2 = new MapObject();

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

    it("MapObject move", function(done){
        var object = new MapObject();
        var object2 = new MapObject();
        object.move(object2);
        expect(object.loc).to.equal(null);
        done();
    })
})