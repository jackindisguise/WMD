// npm includes
const expect = require("chai").expect;

// local includes
const TemplateManager = require("../../../src/mud/manager/TemplateManager");
const ModelManager = require("../../../src/mud/manager/ModelManager");

describe("[OBJECTFACTORY]", function(){
	it("create a MapObject from a Template", function(done){
		let rock = TemplateManager.getTemplateByName("Item.rock");
		let instance = rock.spawn();
		expect(instance.template).is.equal(rock);
		expect(instance.display).is.equal("a rock");
		done();
	});

	it("Model test", function(done){
		let model = ModelManager.getModelByName("Mob.RockThrower");
		let instance = model.spawn();
		expect(instance).is.not.equal(null);
		done();
	});
});	
