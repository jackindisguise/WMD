// npm includes
const expect = require("chai").expect;

// local includes
const Item = require("../../src/mud/map/Item");
const Template = require("../../src/mud/Template");

describe("[TEMPLATE]", function(){
	let template;
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
		let eye = template.spawn();
		expect(eye.level).to.equal(54);
		expect(eye.display).to.equal("Eye of Marduk");
		done();
	});
});
