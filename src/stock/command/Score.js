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
			mob.health, attributes.HEALTH,
			mob.energy, attributes.ENERGY,
			mob.mana, attributes.MANA);
		msg += "\r\n" + _("          %d strength, granting %d attack power, defense, and vitality.", attributes.STRENGTH, attributes.STRENGTH);
		msg += "\r\n" + _("             %d attack power, granting %d physical damage.", attributes.ATTACK_POWER, attributes.ATTACK_POWER);
		msg += "\r\n" + _("             %d defense, granting %f physical damage mitigation.", attributes.DEFENSE, attributes.DEFENSE/2);
		msg += "\r\n" + _("             %d vitality, granting %d maximum health.", attributes.VITALITY, attributes.VITALITY*3);
		msg += "\r\n" + _("          %d agility, granting %d precision, deflection, and stamina.", attributes.AGILITY, attributes.AGILITY);
		msg += "\r\n" + _("             %d precision, granting %d precision rating.", attributes.PRECISION, attributes.PRECISION);
		msg += "\r\n" + _("             %d deflection, granting %d deflection rating.", attributes.DEFLECTION, attributes.DEFLECTION);
		msg += "\r\n" + _("             %d stamina, granting %d maximum energy.", attributes.STAMINA, attributes.STAMINA);
		msg += "\r\n" + _("          %d intelligence, granting %d magic power, resilience, and wisdom.", mob.intelligence, mob.intelligence);
		msg += "\r\n" + _("             %d magic power, granting %d magical damage.", mob.magicPower, mob.magicPower);
		msg += "\r\n" + _("             %d resilience, granting %d magical damage mitigation.", mob.resilience, mob.resilience/2);
		msg += "\r\n" + _("             %d wisdom, granting %d maximum mana.", mob.wisdom, mob.wisdom);
		msg += "\r\n" + "".center(80, "-");
		mob.sendLine(msg);
	}
}

Score.prototype.rule = /^(?:s|sc|sco|scor|score)\b/i;
Score.prototype.plain = "score";
Score.prototype.specificity = CommandSpecificity.LAST;

module.exports = Score;
