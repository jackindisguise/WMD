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
						firstPerson: util.format("You %s $N for %d damage. [%f%%]", format.firstPerson, options.damage, display),
						secondPerson: util.format("$n %s you for %d damage. [%f%%]", format.thirdPerson, options.damage, display),
						thirdPerson: util.format("$n %s $N for %d damage. [%f%%]", format.thirdPerson, options.damage, display)
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
						firstPerson: util.format("You %s $N with %s for %d damage. [%f%%]", format.firstPerson, weapon.display, options.damage, display),
						secondPerson: util.format("$n %s you with %s for %d damage. [%f%%]", format.thirdPerson, weapon.display, options.damage, display),
						thirdPerson: util.format("$n %s $N with %s for %d damage. [%f%%]", format.thirdPerson, weapon.display, options.damage, display)
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
					firstPerson: util.format("Your %s hits $N for %d damage. [%f%%]", options.ability, options.damage, display),
					secondPerson: util.format("$n's %s hits you for %d damage. [%f%%]", options.ability, options.damage, display),
					thirdPerson: util.format("$n's %s hits $N for %d damage. [%f%%]", options.ability, options.damage, display)
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
				firstPerson: util.format("You %s $N for %d damage. [%f%%]", action.firstPerson, damage, display),
				secondPerson: util.format("$n %s you for %d damage. [%f%%]", action.thirdPerson, damage, display),
				thirdPerson: util.format("$n %s $N for %d damage. [%f%%]", action.thirdPerson, damage, display)
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
				firstPerson: util.format("Your %s hits $N for %d damage. [%f%%]", ability, damage, display),
				secondPerson: util.format("$n's %s hits you for %d damage. [%f%%]", ability, damage, display),
				thirdPerson: util.format("$n's %s hits $N for %d damage. [%f%%]", ability, damage, display)
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
