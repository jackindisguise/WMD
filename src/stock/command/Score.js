// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Score extends Command{
	exec(mob){
		let attributes = mob.getAttributes();
		let rawAttributes = mob.getRawAttributes();
		let msg = "".center(80, "-"); 
		msg += "\r\n" + _("You are... %s the %s %s.", mob.name, mob.race.display, mob.class.display);
		msg += "\r\n" + _("You're level {W%d{x, with {C%d {cexperience{x until the next level.", mob.level, mob.tnl-mob.experience);
		msg += "\r\n" + _("You have: {R%d/%d health{x, {Y%d/%d energy{x, and {C%d/%d mana{x.",
			mob.health, attributes.health,
			mob.energy, attributes.energy,
			mob.mana, attributes.mana);

		// attributes
		// strength
		if(attributes.strength === rawAttributes.strength){
			msg += "\r\n" + _("          {R%d strength.", attributes.strength);
		} else {
			let diff = attributes.strength - rawAttributes.strength;
			msg += "\r\n" + _("          {R%d (%s%d) strength.",
				attributes.strength,
				diff > 0 ? "+" : "",
				diff,
				attributes.strength
			);
		}

		// attack power
		if(attributes["attack power"] === rawAttributes["attack power"]) {
			msg += "\r\n" + _("             %d attack power, granting %d physical damage.", attributes["attack power"], attributes["attack power"]);
		} else {
			let diff = attributes["attack power"] - rawAttributes["attack power"];
			msg += "\r\n" + _("             %d (%s%d) attack power, granting %d physical damage.",
				attributes["attack power"],
				diff > 0 ? "+" : "",
				diff,
				attributes["attack power"]
			);
		}

		// defense
		if(attributes.defense === rawAttributes.defense) {
			msg += "\r\n" + _("             %d defense, granting %f physical damage mitigation.", attributes.defense, attributes.defense/2);
		} else {
			let diff = attributes.defense - rawAttributes.defense;
			msg += "\r\n" + _("             %d (%s%d) defense, granting %f physical damage mitigation.",
				attributes.defense,
				diff > 0 ? "+" : "",
				diff,
				attributes.defense/2
			);
		}

		// vitality
		msg += "\r\n" + _("             %d vitality, granting %d maximum health.", attributes.vitality, attributes.vitality*3);
		msg += "\r\n" + _("          {C%d intelligence.", attributes.intelligence);
		msg += "\r\n" + _("             %d magic power, granting %d magical damage.", attributes["magic power"], attributes["magic power"]);
		msg += "\r\n" + _("             %d resilience, granting %d magical damage mitigation.", attributes.resilience, attributes.resilience/2);
		msg += "\r\n" + _("             %d wisdom, granting %d maximum mana.", attributes.wisdom, attributes.wisdom);
		msg += "\r\n" + _("          {Y%d agility.", attributes.agility);
		msg += "\r\n" + _("             %d precision, granting %d precision rating.", attributes.precision, attributes.precision);
		msg += "\r\n" + _("             %d deflection, granting %d deflection rating.", attributes.deflection, attributes.deflection);
		msg += "\r\n" + _("             %d stamina, granting %d maximum energy.{x", attributes.stamina, attributes.stamina);
		msg += "\r\n" + "".center(80, "-");
		mob.sendLine(msg);
	}
}

Score.prototype.rule = /^(?:s|sc|sco|scor|score)\b/i;
Score.prototype.plain = "score";
Score.prototype.specificity = CommandSpecificity.LAST;

module.exports = Score;
