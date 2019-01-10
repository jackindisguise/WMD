// npm includes
const expect = require("chai").expect;

// local includes
const TemplateManager = require("../../../src/mud/manager/TemplateManager");

describe("[TEMPLATEMANAGER]", function(){
	it("I got a rock...", function(done){
		let template = TemplateManager.getTemplateByName("Item.rock");
		let instance = template.spawn();
		expect(instance.template).is.equal(template);
		done();
	});
});
