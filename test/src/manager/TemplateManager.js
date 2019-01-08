// npm includes
var expect = require("chai").expect;

// local includes
var TemplateManager = require("../../../src/mud/manager/TemplateManager");

describe("[TEMPLATEMANAGER]", function(){
	it("I got a rock...", function(done){
		var template = TemplateManager.getTemplateByName("Item.rock");
		var instance = template.spawn();
		expect(instance.template).is.equal(template);
		done();
	});
});
