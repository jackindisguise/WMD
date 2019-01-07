// node includes
const process = require("process");

// local includes
const _ = require("../../../i18n");
const Command = require("../Command");
const CommandSpecificity = require("../CommandSpecificity");
const ObjectManager = require("../manager/ObjectManager");

class Test extends Command{
	exec(mob){
		let Mob = require("../map/Mob");
		console.log("before:", process.memoryUsage());
		let count = 10000;
		for(var c=0;c<count;c++){
			let m = new Mob();
			m.loc = mob.loc;
			setTimeout(function(){
				m.loc = null;
			}, 1000);
		}

		console.log(`after creating ${count} mobs:`, process.memoryUsage());
		setTimeout(function(){
			console.log("2 seconds after moving to the void:", process.memoryUsage());
		}, 3000);
		setTimeout(function(){
			console.log("10 seconds after moving to the void:", process.memoryUsage());
		}, 10000);
		setTimeout(function(){
			console.log("20 seconds after moving to the void:", process.memoryUsage());
		}, 20000);
		setTimeout(function(){
			console.log("30 seconds after moving to the void:", process.memoryUsage());
		}, 30000);
	}
}

Test.prototype.rule = /^(?:t|te|tes|test)\b/i;
Test.prototype.plain = "test";
Test.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Test;
