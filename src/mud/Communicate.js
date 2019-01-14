// local includes
require("../lib/Math");
require("../lib/String");
const MessageCategory = require("./MessageCategory");

// stuff
class Communicate{
	static act(options){
		if(!options.actor) return;
		if(!options.recipients) return;

		// defaults for easy access
		let actor = options.actor,
			directObject = options.directObject,
			recipients = options.recipients,
			message = options.message,
			category = options.category || MessageCategory.ACTION;

		// process recipientss
		if(recipients){
			// send messages
			for(let recipient of recipients){
				if(recipient === actor && message.firstPerson) recipient.sendMessage(message.firstPerson.tie(options), category);
				else if(recipient === directObject && message.secondPerson) recipient.sendMessage(message.secondPerson.tie(options), category);
				else if(message.thirdPerson) recipient.sendMessage(message.thirdPerson.tie(options), category);
			}
		}
	}

	static hit(options){
		let target = options.directObject;
		let damage = options.damage;
		let targetHealthP = Math.max(target.health-damage, 0) / target.maxHealth;
		let range = Math.floor(Math.lerp(1,5,targetHealthP));
		let codes = ["r", "R", "Y", "G", "C"];
		let healthCode = codes[range-1];
		let healthPer = Math.round(targetHealthP * 100);

		// append to options
		options.healthCode = healthCode;
		options.healthPer = healthPer;

		// call act
		Communicate.act(options);
	}
}

module.exports = Communicate;
