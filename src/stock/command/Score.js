// local includes
const _ = require("../../../i18n");
const Command = require("../../mud/Command");
const CommandSpecificity = require("../../etc/CommandSpecificity");

class Score extends Command{
	exec(mob){
		let attributes = mob.getAttributes();
		let msg = "".center(80, "-"); 
		msg += "\r\n" + _("%s the %s %s.", mob.name, mob.race.display, mob.class.display);
		msg += "\r\n" + _("You're level %d, with %d experience until the next level.", mob.level, mob.tnl-mob.experience);
		msg += "\r\n" + _("You have: %d/%d health, %d/%d energy, and %d/%d mana.",
			mob.health, attributes.health,
			mob.energy, attributes.energy,
			mob.mana, attributes.mana);
		msg += "\r\n" + _("          %d strength, granting %d attack power, defense, and vitality.", attributes.strength, attributes.strength);
		msg += "\r\n" + _("             %d attack power, granting %d physical damage.", attributes["attack power"], attributes["attack power"]);
		msg += "\r\n" + _("             %d defense, granting %f physical damage mitigation.", attributes.defense, attributes.defense/2);
		msg += "\r\n" + _("             %d vitality, granting %d maximum health.", attributes.vitality, attributes.vitality*3);
		msg += "\r\n" + _("          %d agility, granting %d precision, deflection, and stamina.", attributes.agility, attributes.agility);
		msg += "\r\n" + _("             %d precision, granting %d precision rating.", attributes.precision, attributes.precision);
		msg += "\r\n" + _("             %d deflection, granting %d deflection rating.", attributes.deflection, attributes.deflection);
		msg += "\r\n" + _("             %d stamina, granting %d maximum energy.", attributes.stamina, attributes.stamina);
		msg += "\r\n" + _("          %d intelligence, granting %d magic power, resilience, and wisdom.", attributes.intelligence, attributes.intelligence);
		msg += "\r\n" + _("             %d magic power, granting %d magical damage.", attributes["magic power"], attributes["magic power"]);
		msg += "\r\n" + _("             %d resilience, granting %d magical damage mitigation.", attributes.resilience, attributes.resilience/2);
		msg += "\r\n" + _("             %d wisdom, granting %d maximum mana.", attributes.wisdom, attributes.wisdom);
		msg += "\r\n" + "".center(80, "-");
		mob.sendLine(msg);
	}
}

Score.prototype.rule = /^(?:s|sc|sco|scor|score)\b/i;
Score.prototype.plain = "score";
Score.prototype.specificity = CommandSpecificity.LAST;

module.exports = Score;
