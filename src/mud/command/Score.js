// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Score extends Command{
	exec(mob){
		var attributes = mob.getAttributes();
		var msg = "".center(80, "-"); 
		msg += "\r\n" + _("%s the %s %s.", mob.name, mob.race.display, mob.class.display);
		msg += "\r\n" + _("You're level {W%d{x, with {B%d{x experience until the next level.", mob.level, mob.tnl);
		msg += "\r\n" + _("You have: {R%d/%d{x health, {G%d/%d{x energy, and {C%d/%d{x mana.",
							mob.health, attributes.HEALTH,
							mob.energy, attributes.ENERGY,
							mob.mana, attributes.MANA);
		msg += "\r\n" + _("          {R%d{x strength, granting {R%d{x attack power, defense, and vitality.", attributes.STRENGTH, attributes.STRENGTH);
		msg += "\r\n" + _("             {R%d{x attack power, granting {R%d{x physical damage.", attributes.ATTACK_POWER, attributes.ATTACK_POWER);
		msg += "\r\n" + _("             {R%d{x defense, granting {R%f{x physical damage mitigation.", attributes.DEFENSE, attributes.DEFENSE*0.5);
		msg += "\r\n" + _("             {R%d{x vitality, granting {R%d{x maximum health.", attributes.VITALITY, attributes.VITALITY);
		msg += "\r\n" + _("          {G%d{x agility, granting {G%d{x precision, deflection, and stamina.", attributes.AGILITY, attributes.AGILITY);
		msg += "\r\n" + _("             {G%d{x precision, granting {G%d{x precision rating.", attributes.PRECISION, attributes.PRECISION);
		msg += "\r\n" + _("             {G%d{x deflection, granting {G%d{x deflection rating.", attributes.DEFLECTION, attributes.DEFLECTION);
		msg += "\r\n" + _("             {G%d{x stamina, granting {G%d{x maximum energy.", attributes.STAMINA, attributes.STAMINA);
		msg += "\r\n" + _("          {C%d{x intelligence, granting {C%d{x magic power, resilience, and wisdom.", mob.intelligence, mob.intelligence);
		msg += "\r\n" + _("             {C%d{x magic power, granting {C%d{x magical damage.", mob.magicPower, mob.magicPower);
		msg += "\r\n" + _("             {C%d{x resilience, granting {C%d{x magical damage mitigation.", mob.resilience, mob.resilience/2);
		msg += "\r\n" + _("             {C%d{x wisdom, granting {C%d{x maximum mana.", mob.wisdom, mob.wisdom);
		msg += "\r\n" + "".center(80, "-");
		mob.sendLine(msg);
	}
}

Score.prototype.rule = /^(?:s|sc|sco|scor|score)\b/;
Score.prototype.plain = "score";
Score.prototype.specificity = CommandSpecificity.LAST;

module.exports = Score;
