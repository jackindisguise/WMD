// local includes
require("../lib/Math");
require("../lib/String");
const Message = require("../etc/Message");
const MessageCategory = require("../etc/MessageCategory");
const CombatManager = require("./manager/CombatManager");

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
				else continue;

				// get prefix
				if(options.prefix) {
					let prefix = options.prefix;
					if(!Array.isArray(options.prefix)) prefix = [options.prefix];
					for(let _prefix of prefix){
						if(recipient === actor && _prefix.firstPerson) processed = _prefix.firstPerson + processed;
						else if(recipient === directObject && _prefix.secondPerson) processed = _prefix.secondPerson + processed;
						else if(_prefix.thirdPerson) processed = _prefix.thirdPerson + processed;
					}
				}

				// get suffix
				if(options.suffix) {
					let suffix = options.suffix;
					if(!Array.isArray(options.suffix)) suffix = [options.suffix];
					for(let _suffix of suffix){
						if(recipient === actor && _suffix.firstPerson) processed = processed + _suffix.firstPerson;
						else if(recipient === directObject && _suffix.secondPerson) processed = processed + _suffix.secondPerson;
						else if(_suffix.thirdPerson) processed = processed + _suffix.thirdPerson;
					}
				}

				// tie options
				processed = processed.tie(options);

				// capitalize first letter
				let firstLetterRule = /(?<!\{)[^{\s]/;
				processed = processed.replace(firstLetterRule, function(char){
					return char.toUpperCase();
				});

				recipient.sendMessage(processed, category);
			}
		}
	}

	static busy(options){
		// append to options
		options.prefix = Message.BusyPrefix;
		options.suffix = Message.BusySuffix;

		// call act
		Communicate.act(options);
	}

	static ability(options){
		// shortcuts
		let actor = options.actor;

		// append to options
		options.prefix = Message.BusyPrefix;
		options.suffix = [Message.BusySuffix];
		if(options.energy) {
			let maxEP = actor.maxEnergy, afterEP = Math.min(actor.energy + options.energy, maxEP);
			options.energyFormatted = `${afterEP}/${maxEP}`;
			options.suffix.push(Message.ExpendEnergySuffix);
		}

		if(options.mana) {
			let maxMP = actor.maxMana, afterMP = Math.min(actor.mana + options.mana, maxMP);
			options.manaFormatted = `${afterMP}/${maxMP}`;
			options.suffix.push(Message.ExpendManaSuffix);
		}

		// call act
		Communicate.act(options);
	}

	static ready(options){
		// append to options
		options.prefix = Message.ReadyPrefix;
		options.suffix = Message.ReadySuffix;

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
		//let words = ["dying", "wounded", "not great", "great", "perfect"];
		let healthCode = codes[range-1];
		//let word = words[range-1];
		//let healthAfterPRounded = Math.round(healthAfterP * 100);

		// append to options
		options.healthCode = healthCode;
		options.healthFormatted = `${healthAfter}/${target.maxHealth}`;
		//options.healthAfterP = healthAfterPRounded;
		//options.healthAfterWord = word;
		options.suffix = Message.AttackDamageSuffix;
		options.category = options.category || CombatManager.category;

		// call act
		Communicate.act(options);
	}

	static regen(options){
		// shortcuts
		let actor = options.actor;

		// append to options
		options.message = Message.Regen;
		if(options.health) {
			let maxHP = actor.maxHealth, afterHP = Math.min(actor.health + options.health, maxHP);
			options.healthFormatted = `${afterHP}/${maxHP}`;
		}

		if(options.energy) {
			let maxEP = actor.maxEnergy, afterEP = Math.min(actor.energy + options.energy, maxEP);
			options.energyFormatted = `${afterEP}/${maxEP}`;
		}

		if(options.mana) {
			let maxMP = actor.maxMana, afterMP = Math.min(actor.mana + options.mana, maxMP);
			options.manaFormatted = `${afterMP}/${maxMP}`;
		}

		// call act
		Communicate.act(options);
	}

	static heal(options){
		let target = options.directObject;
		let heal = options.heal;
		let healthAfter = Math.max(target.health+heal, 0);
		let healthAfterP = healthAfter / target.maxHealth;
		let range = Math.floor(Math.lerp(1,5,healthAfterP));
		let codes = ["r", "R", "Y", "G", "C"];
		//let words = ["dying", "wounded", "not great", "great", "perfect"];
		let healthCode = codes[range-1];
		//let word = words[range-1];
		//let healthAfterPRounded = Math.round(healthAfterP * 100);

		// append to options
		options.healthCode = healthCode;
		options.healthFormatted = `${healthAfter}/${target.maxHealth}`;
		//options.healthAfterP = healthAfterPRounded;
		//options.healthAfterWord = word;
		options.suffix = Message.HealSuffix;

		// call act
		Communicate.act(options);
	}

	static experience(options){
		let actor = options.actor;
		let experience = options.experience;
		let experienceAfter = actor.experience + experience;
		let tnl = actor.toNextLevel;
		let experienceFormatted = `${experienceAfter}/${tnl}`;

		// append to options
		options.suffix = Message.GainExperienceSuffix;
		options.experienceFormatted = experienceFormatted;

		// call act
		Communicate.act(options);
	}
}

module.exports = Communicate;
