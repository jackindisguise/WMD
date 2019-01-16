// local includes
require("../../lib/String");
const _ = require("../../../i18n");
const CommandSpecificity = require("../etc/CommandSpecificity");
const Command = require("../Command");

class Abilities extends Command{
	exec(mob){
		let abilities = [];
		let found = [];
		if(mob.race.abilities){
			for(let learn of mob.race.abilities){
				if(found.indexOf(learn.ability) !== -1) continue; // ignore already tracked abilities
				if(!abilities[learn.level]) abilities[learn.level] = [];
				abilities[learn.level].push(learn.ability);
				found.push(learn.ability);
			}
		}

		if(mob.class.abilities){
			for(let learn of mob.class.abilities){
				if(found.indexOf(learn.ability) !== -1) continue;
				if(!abilities[learn.level]) abilities[learn.level] = [];
				abilities[learn.level].push(learn.ability);
				found.push(learn.ability);
			}
		}

		let msg = _("- Abilities -").padRight(80, "-");
		for(let i=0;i<abilities.length;i++){
			let lvl = abilities[i];
			if(!lvl) continue;
			for(let j=0;j<lvl.length;j++){
				let ability = lvl[j];
				if(j===0) msg += "\r\n" + _("Level %s: ", String(i).padLeft(3)).padRight(10) + ability.display;
				else msg += "\r\n          " + ability.display;
			}
		}

		mob.sendLine(msg);
	}
}

Abilities.prototype.rule = /^(?:a|ab|abi|abil|abili|abilit|abiliti|abilitie|abilities)\b/i;
Abilities.prototype.plain = "abilities";
Abilities.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Abilities;
