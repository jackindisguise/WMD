// node includes
const util = require("util");

// local includes
require("../lib/Math");
const _ = require("../../i18n");
const Logger = require("../util/Logger");
const MessageCategory = require("./MessageCategory");
const CombatManager = require("./manager/CombatManager");
const CombatAction = require("./CombatAction");

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

	static hit(options){
		if(!options) return;
		if(!options.attacker) return;
		if(!options.target) return; // no target, not valid
		if(options.damage === null) return; // no damage, not valid

		// determine damage display and color codes
		let targetHealthP = Math.max(options.target.health-options.damage, 0) / options.target.maxHealth;
		let range = Math.floor(Math.lerp(1,5,targetHealthP));
		let codes = ["r", "R", "Y", "G", "C"];
		let code = codes[range-1];
		let display = Math.round(targetHealthP * 100);

		// normal auto attack
		if(options.attack){
			let weapon = options.weapon;
			if(!weapon){
				let action = CombatAction.PUNCH;
				let format = action.format;
				Communicate.act(
					options.attacker,
					{
						firstPerson: util.format("{wYou %s {R$N {wfor {R%d {wdamage. {x[{%s%f%%{x]", format.firstPerson, options.damage, code, display),
						secondPerson: util.format("{R$n {D%s you for {R%d {Ddamage. {x[{%s%f%%{x]", format.thirdPerson, options.damage, code, display),
						thirdPerson: util.format("{c$n %s $N for {R%d {cdamage. {x[{%s%f%%{x]", format.thirdPerson, options.damage, code, display)
					},
					options.attacker.loc.contents,
					{directObject:options.target},
					null,
					CombatManager.category
				);
			} else {
				let action = weapon.action;
				let format = action.format;
				Communicate.act(
					options.attacker,
					{
						firstPerson: util.format("{wYou %s {R$N {wwith {Y%s {wfor {R%d {wdamage. {x[{%s%f%%{x]", format.firstPerson, weapon.display, options.damage, code, display),
						secondPerson: util.format("{R$n {D%s you with {Y%s {Dfor {R%d {Ddamage. {x[{%s%f%%{x]", format.thirdPerson, weapon.display, options.damage, code, display),
						thirdPerson: util.format("{c$n %s $N with {Y%s {cfor {R%d {cdamage. {x[{%s%f%%{x]", format.thirdPerson, weapon.display, options.damage, code, display)
					},
					options.attacker.loc.contents,
					{directObject:options.target},
					null,
					CombatManager.category
				);
			}

		// ability use
		} else if(options.ability){
			Communicate.act(
				options.attacker,
				{
					firstPerson: util.format("{wYour {Y%s {whits {R$N {cfor {R%d {wdamage. {x[{%s%f%%{x]", options.ability, options.damage, code, display),
					secondPerson: util.format("{R$n's {Y%s {Dhits you for {R%d {Ddamage. {x[{%s%f%%{x]", options.ability, options.damage, code, display),
					thirdPerson: util.format("{c$n's {Y%s {chits $N for {R%d {cdamage. {x[{%s%f%%{x]", options.ability, options.damage, code, display)
				},
				options.attacker.loc.contents,
				{directObject:options.target},
				null,
				CombatManager.category
			);
		}
	}

	static attack(attacker, target, action, damage){
		let targetHealthP = Math.max(target.health-damage, 0) / target.maxHealth;
		let range = Math.round(Math.lerp(1,4,targetHealthP));
		let codes = ["R", "P", "Y", "G"];
		let code = codes[range-1];
		let display = Math.round(targetHealthP * 100);
		Communicate.act(
			attacker,
			{
				firstPerson: util.format("{wYou %s $N for {R%d{w damage.{x [{%s%f%%{x]", action.firstPerson, damage, code, display),
				secondPerson: util.format("{D$n %s you for {R%d{D damage.{x [{%s%f%%{x]", action.thirdPerson, damage, code, display),
				thirdPerson: util.format("{r$n %s $N for {R%d{r damage.{x [{%s%f%%{x]", action.thirdPerson, damage, code, display)
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
				firstPerson: util.format("{wYour %s hits $N for {R%d{w damage.{x [{%s%f%%{x]", ability, damage, code, display),
				secondPerson: util.format("{D$n's %s hits you for {R%d{D damage.{x [{%s%f%%{x]", ability, damage, code, display),
				thirdPerson: util.format("{r$n's %s hits $N for {R%d{r damage.{x [{%s%f%%{x]", ability, damage, code, display)
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
