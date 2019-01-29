// npm includes
const expect = require("chai").expect;

// local includes
require("../../src/lib/Object");

// testing
class A{}
A.prototype.a = 1;
A.prototype.b = 2;

class B extends A{
	__JSONWrite(key, value, json){
		if(key === "a" && this.constructor.prototype[key] !== value) json["Z"] = value*10; // when a isn't default, save it with a different key "Z" and with 10x its value
		else Object.__JSONWrite.call(this, key, value, json);
	}

	__JSONRead(key, value){
		if(key === "Z") this.a = value/10; // read 1/10th of the value of "Z"
		else Object.__JSONRead.call(this, key, value);
	}
}
B.prototype.c = 3;
B.prototype.d = 4;
describe("[OBJECT]", function(){
	describe("JSON Read/Write", function(){
		it("toJSON", function(done){
			let b = new B();
			let bJSON = b.__toJSON();
			expect(JSON.stringify(bJSON)).to.equal("{}");
			done();
		});

		it("fromJSON", function(done){
			let b = new B();
			b.a = 55;
			let cJSON = b.__toJSON();
			expect(JSON.stringify(cJSON)).to.equal("{\"Z\":550}");

			let bClone = new B();
			bClone.__fromJSON(cJSON);
			expect(bClone.a).to.equal(55);
			expect(bClone.b).to.equal(2);
			expect(bClone.c).to.equal(3);
			expect(bClone.d).to.equal(4);
			done();
		});
	});
});
