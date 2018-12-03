// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Database = require("../core/Database");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var Item = require("../map/Item");

class Score extends Command{
	exec(mob){
		var msg = _(" %s the %s %s ", mob.name, mob.race.display, mob.class.display).center(80, "-");
		msg += "\r\n" + _("%s Health: %s/%s %s Mana: %s/%s %s Energy: %s/%s %s", "|", String(mob.health).padLeft(7), String(mob.health).padRight(7), "|", String(mob.mana).padLeft(9), String(mob.mana).padRight(8), "|", String(mob.energy).padLeft(7), String(mob.energy).padRight(7), "|");
		msg += "\r\n" + _(" %s ", "Primary").center(80, "-");
		msg += "\r\n" + _("%s %s %s %s %s %s %s", "|", "Strength".center(23), "|", "Agility".center(24), "|", "Intelligence".center(23), "|");
		msg += "\r\n" + _("%s %s %s %s %s %s %s", "|", String(mob.strength).center(23), "|", String(mob.agility).center(24), "|", String(mob.intelligence).center(23), "|");
		msg += "\r\n" + _(" %s ", "Secondary").center(80, "-");
		msg += "\r\n" + _("%s %s %s %s %s %s %s %s %s %s", "|", "Attack Power:".padRight(14), String(mob.attackPower).padRight(8), "|", "Speed:".padRight(14), String(mob.speed).padRight(9), "|", "Magic Power:".padRight(14), String(mob.magicPower).padRight(8), "|");
		msg += "\r\n" + _("%s %s %s %s %s %s %s %s %s %s", "|", "Defense:".padRight(14), String(mob.defense).padRight(8), "|", "Evasion:".padRight(14), String(mob.evasion).padRight(9), "|", "Resilience:".padRight(14), String(mob.resilience).padRight(8), "|");
		msg += "\r\n" + _("%s %s %s %s %s %s %s %s %s %s", "|", "Vitality:".padRight(14), String(mob.vitality).padRight(8), "|", "Stamina:".padRight(14), String(mob.stamina).padRight(9), "|", "Wisdom:".padRight(14), String(mob.wisdom).padRight(8), "|");
		msg += "\r\n" + _(" %s ", "Worth").center(80, "-");
		msg += "\r\n" + _("%s %s %s", "|", _("You are carrying %d items.", mob.contents.length).center(76), "|");
		msg += "\r\n" + _(" %s ", String(Math.rangeInt(1,100)).padLeft(3, "0")).center(80, "-");
		mob.sendLine(msg);
	}
}

Score.prototype.rule = /^(?:s|sc|sco|scor|score)\b/;
Score.prototype.plain = "score";
Score.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Score;
