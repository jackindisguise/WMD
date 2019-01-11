// node includes
const util = require("util");

// local includes
require("../lib/Math");
const _ = require("../../i18n");
const Logger = require("../util/Logger");
const MessageCategory = require("./MessageCategory");
const CombatManager = require("./manager/CombatManager");

// stuff
class Communicate{
	/**
     * Express an action to those around a mob.
     * ***TODO*** add documentation for legal fields
     * @param {Mob} actor
     * @param {ActFormat} format
     * @param {Mob[]} targets
     * @param {Object} fields
     * @param {function} filter
     * @param {MessageCategory} category
     */
	static act(actor, format, targets, fields, filter, category=MessageCategory.ACTION){
		if(targets.indexOf(actor) === -1) targets.push(actor);
		for(let target of targets){
			// target filtered out
			if(filter && !filter(actor, fields, target)) continue;

			// process string
			let processed;
			if(target === actor) processed = Communicate.actFieldCodeReplace(format.firstPerson, actor, fields);
			else if(fields && target === fields.directObject) processed = Communicate.actFieldCodeReplace(format.secondPerson, actor, fields);
			else processed = Communicate.actFieldCodeReplace(format.thirdPerson, actor, fields);

			// send message
			target.sendMessage(processed, category);
		}
	}

	static attack(attacker, target, action, damage){
		let targetHealthP = (target.health-damage) / target.maxHealth;
		let range = Math.round(Math.lerp(1,4,targetHealthP));
		let codes = ["R", "P", "Y", "G"];
		let code = codes[range-1];
		let display = Math.round(targetHealthP * 100);
		Communicate.act(
			attacker,
			{
				firstPerson: util.format("{yYou %s $N for {R%d{y damage.{x [{%s%f%%{x]", action.firstPerson, damage, code, display),
				secondPerson: util.format("{r$n %s you for {R%d{r damage.{x [{%s%f%%{x]", action.thirdPerson, damage, code, display),
				thirdPerson: util.format("{w$n %s $N for {R%d{w damage.{x [{%s%f%%{x]", action.thirdPerson, damage, code, display)
			},
			attacker.loc.contents,
			{directObject:target},
			null,
			CombatManager.category
		);
	}

	static ability(attacker, target, ability, damage){
		let targetHealthP = (target.health-damage) / target.maxHealth;
		let range = Math.round(Math.lerp(1,4,targetHealthP));
		let codes = ["R", "P", "Y", "G"];
		let code = codes[range-1];
		let display = Math.round(targetHealthP * 100);
		Communicate.act(
			attacker,
			{
				firstPerson: util.format("{yYour %s hits $N for {R%d{y damage.{x [{%s%f%%{x]", ability, damage, code, display),
				secondPerson: util.format("{r$n's %s hits you for {R%d{r damage.{x [{%s%f%%{x]", ability, damage, code, display),
				thirdPerson: util.format("{w$n's %s hits $N for {R%d{w damage.{x [{%s%f%%{x]", ability, damage, code, display)
			},
			attacker.loc.contents,
			{directObject:target},
			null,
			CombatManager.category
		);
	}

	/**
     * Replace act field codes with field values.
     * @param {string} string
     * @param {Mob} actor
     * @param {Object} fields 
     */
	static actFieldCodeReplace(string, actor, fields){
		return string.replace(/\$(.)/g, function(full, code){
			switch(code){
			case "n": return actor.name;
			case "N": return fields.directObject ? fields.directObject.name : "(unknown)";
			case "m": return fields.message ? fields.message : "(unknown)";
			default:
				Logger.error(_("BAD ACT CODE: %s", code));
				return "???";
			}
		});
	}

	/**
     * Filters out all but the actor and the directObject.
     * @param {Mob} actor 
     * @param {Mob} target 
     * @param {Object} fields
     */
	static filterActorVictimOnly(actor, target, fields){
		return target === actor ? true : target === fields.directObject ? true : false;
	}
}

module.exports = Communicate;
