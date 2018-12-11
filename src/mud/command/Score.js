// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Score extends Command{
	exec(mob){
		var msg = _(" %s the %s %s ", mob.name, mob.race.name, mob.class.name).center(80, "-");
		msg += "\r\n" + util.format("%s %s: %s/%s %s %s: %s/%s %s %s: %s/%s %s", "|", _("Health"), String(mob.health).padLeft(7), String(mob.health).padRight(7), "|", _("Mana"), String(mob.mana).padLeft(9), String(mob.mana).padRight(8), "|", _("Energy"), String(mob.energy).padLeft(7), String(mob.energy).padRight(7), "|");
		msg += "\r\n" + util.format(" %s ", "Primary").center(80, "-");
		msg += "\r\n" + util.format("%s %s %s %s %s %s %s", "|", "Strength".center(23), "|", "Agility".center(24), "|", "Intelligence".center(23), "|");
		msg += "\r\n" + util.format("%s %s %s %s %s %s %s", "|", String(mob.strength).center(23), "|", String(mob.agility).center(24), "|", String(mob.intelligence).center(23), "|");
		msg += "\r\n" + util.format(" %s ", "Secondary").center(80, "-");
		msg += "\r\n" + util.format("%s %s: %s %s %s: %s %s %s: %s %s", "|", _("Attack Power").padLeft(13), String(mob.attackPower).padRight(8), "|", _("Speed").padLeft(13), String(mob.speed).padRight(9), "|", _("Magic Power").padLeft(13), String(mob.magicPower).padRight(8), "|");
		msg += "\r\n" + util.format("%s %s: %s %s %s: %s %s %s: %s %s", "|", _("Defense").padLeft(13), String(mob.defense).padRight(8), "|", _("Evasion").padLeft(13), String(mob.evasion).padRight(9), "|", _("Resilience").padLeft(13), String(mob.resilience).padRight(8), "|");
		msg += "\r\n" + util.format("%s %s: %s %s %s: %s %s %s: %s %s", "|", _("Vitality").padLeft(13), String(mob.vitality).padRight(8), "|", _("Stamina").padLeft(13), String(mob.stamina).padRight(9), "|", _("Wisdom").padLeft(13), String(mob.wisdom).padRight(8), "|");
		msg += "\r\n" + util.format(" %s ", "Worth").center(80, "-");
		msg += "\r\n" + util.format("%s %s %s", "|", _("You are carrying %d items.", mob.contents.length).center(76), "|");
		msg += "\r\n" + util.format(" %s ", String(Math.rangeInt(1,100)).padLeft(3, "0")).center(80, "-");
		mob.sendLine(msg);
	}
}

Score.prototype.rule = /^(?:s|sc|sco|scor|score)\b/;
Score.prototype.plain = "score";
Score.prototype.specificity = CommandSpecificity.LAST;

module.exports = Score;
