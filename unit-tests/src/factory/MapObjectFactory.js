// npm includes
var expect = require("chai").expect;

// local includes
var TemplateManager = require("../../../src/mud/manager/TemplateManager");
var MapObjectFactory = require("../../../src/mud/factory/MapObjectFactory");

describe("MapObjectFactory", function(){
	it("create a MapObject from a Template", function(done){
		var rock = TemplateManager.getTemplateByName("rock");
		var instance = rock.spawn();
		expect(instance.template).is.equal(rock);
		expect(instance.display).is.equal("a rock");
		done();
	});

	it("create a belt from a template containing another object", function(done){
		var excalibur = TemplateManager.getTemplateByName("excalibur");
		var belt = TemplateManager.getTemplateByName("belt");
		var instance = belt.spawn();
		expect(instance.template).is.equal(belt);
		var clone = instance.clone();
		expect(clone.template).is.equal(belt);
		expect(clone.contents[0].template).is.equal(excalibur);
		done();
	});
});
