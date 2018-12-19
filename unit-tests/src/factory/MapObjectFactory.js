// npm includes
var expect = require("chai").expect;

// local includes
var TemplateManager = require("../../../src/mud/manager/TemplateManager");
var ModelManager = require("../../../src/mud/manager/ModelManager");
var MapObjectFactory = require("../../../src/mud/factory/MapObjectFactory");

describe("[OBJECTFACTORY]", function(){
	it("create a MapObject from a Template", function(done){
		var rock = TemplateManager.getTemplateByName("Item.rock");
		var instance = rock.spawn();
		expect(instance.template).is.equal(rock);
		expect(instance.display).is.equal("a rock");
		done();
	});

	it("Model test", function(done){
		var model = ModelManager.getModelByName("Mob.RockThrower");
		var instance = model.spawn();
		done();
	});
});	
