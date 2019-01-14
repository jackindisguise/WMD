// local includes
require("../lib/Math");
require("../lib/String");
const MessageCategory = require("./MessageCategory");
const CombatManager = require("./manager/CombatManager");
const Message = require("./Message");

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
				let processed;

				// get base message
				if(recipient === actor && message.firstPerson) processed = message.firstPerson;
				else if(recipient === directObject && message.secondPerson) processed = message.secondPerson;
				else if(message.thirdPerson) processed = message.thirdPerson;

				// get prefix
				if(options.prefix) {
					if(recipient === actor && options.prefix.firstPerson) processed = options.prefix.firstPerson + processed;
					else if(recipient === directObject && options.prefix.secondPerson) processed = options.prefix.secondPerson + processed;
					else if(options.prefix.thirdPerson) processed = options.prefix.thirdPerson + processed;
				}

				// get suffix
				if(options.suffix) {
					if(recipient === actor && options.suffix.firstPerson) processed = processed + options.suffix.firstPerson;
					else if(recipient === directObject && options.suffix.secondPerson) processed = processed + options.suffix.secondPerson;
					else if(options.suffix.thirdPerson) processed = processed + options.suffix.thirdPerson;
				}

				// tie in options
				recipient.sendMessage(processed.tie(options), category);
			}
		}
	}

	static busy(options){
		// append to options
		options.suffix = Message.SuffixBusy;

		// call act
		Communicate.act(options);
	}

	static hit(options){
		let target = options.directObject;
		let damage = options.damage;
		let healthAfter = Math.max(target.health-damage, 0);
		let healthAfterP = healthAfter / target.maxHealth;
		let range = Math.floor(Math.lerp(1,5,healthAfterP));
		let codes = ["r", "R", "Y", "G", "C"];
		let words = ["dying", "wounded", "not great", "great", "perfect"]
		let healthCode = codes[range-1];
		let word = words[range-1];
		let healthAfterPRounded = Math.round(healthAfterP * 100);

		// append to options
		options.healthCode = healthCode;
		options.healthAfter = healthAfter;
		options.healthAfterP = healthAfterPRounded;
		options.healthAfterWord = word;
		options.suffix = Message.SuffixTargetHealthPercentage;
		options.category = options.category || CombatManager.category;

		// call act
		Communicate.act(options);
	}
}

module.exports = Communicate;
