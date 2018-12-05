// npm includes
var expect = require("chai").expect;

// local includes
var Item = require("../../src/mud/map/Item");
var Template = require("../../src/mud/Template");

describe("Template", function(){
	var template;
	it("create new template", function(done){
		template = new Template();
		template.type = Item;
		template.obj = new Item();
		template.obj.level = 54;
		template.obj.keywords = "eye marduk";
		template.obj.display = "Eye of Marduk";
		done();
	});

	it("spawn instance", function(done){
		var eye = template.spawn();
		expect(eye.level).to.equal(54);
		expect(eye.display).to.equal("Eye of Marduk");
		done();
	});
});
