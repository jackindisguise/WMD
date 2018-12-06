// npm includes
var expect = require("chai").expect;

// local includes
var TemplateManager = require("../../../src/mud/manager/TemplateManager");

describe("TemplateManager", function(){
	it("I got a rock...", function(done){
		var template = TemplateManager.getTemplateByName("rock");
		var instance = template.spawn();
		expect(instance.template).is.equal(template);
		done();
	});
});
