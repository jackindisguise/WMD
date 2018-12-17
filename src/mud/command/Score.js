// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");

class Score extends Command{
	exec(mob){
		var msg = "".center(80, "-"); 
		msg += "\r\n" + _("%s the %s %s.", mob.name, mob.race.name, mob.class.name);
		msg += "\r\n" + _("You're level {W%d{x, with {B%d{x experience until the next level.", mob.level, mob.tnl);
		msg += "\r\n" + _("You have: {R%d/%d{x health, {Y%d/%d{x energy, and {C%d/%d{x mana.",
							mob.health, mob.health,
							mob.energy, mob.energy,
							mob.mana, mob.mana);
		msg += "\r\n" + _("          {R%d{x strength, granting {R%d{x attack power, defense, and vitality.", mob.attackPower, mob.attackPower);
		msg += "\r\n" + _("             {R%d{x attack power, granting {R%d{x physical damage.", mob.attackPower, mob.attackPower);
		msg += "\r\n" + _("             {R%d{x defense, granting {R%f{x physical damage mitigation.", mob.defense, mob.defense*0.5);
		msg += "\r\n" + _("             {R%d{x vitality, granting {R%d{x maximum health.", mob.vitality, mob.vitality);

		msg += "\r\n" + _("          {G%d{x agility, granting {G%d{x speed, evasion, and stamina.", mob.agility, mob.agility);
		msg += "\r\n" + _("             {G%d{x speed, granting {G%d{x hit rating.", mob.speed, mob.speed);
		msg += "\r\n" + _("             {G%d{x evasion, granting {G%.2f{x evasion rating.", mob.evasion, mob.evasion*0.1);
		msg += "\r\n" + _("             {G%d{x stamina, granting {G%d{x maximum energy.", mob.stamina, mob.stamina);

		msg += "\r\n" + _("          {C%d{x intelligence, granting {C%d{x magic power, resilience, and wisdom.", mob.intelligence, mob.intelligence);
		msg += "\r\n" + _("             {C%d{x magic power, granting {C%d{x magical damage.", mob.magicPower, mob.magicPower);
		msg += "\r\n" + _("             {C%d{x resilience, granting {C%d{x magical damage mitigation.", mob.resilience, mob.resilience/2);
		msg += "\r\n" + _("             {C%d{x wisdom, granting {C%d{x maximum mana.", mob.wisdom, mob.wisdom);
/*		msg += "\r\n" + "-- Status ".padRight(80, "-");
		msg += "\r\n" + util.format("| %s %s %s |",
							_("{RHealth: {W%d/%d{x", mob.health, mob.health).padRight(25),
							_("{YEnergy: {W%d/%d{x", mob.energy, mob.energy).padRight(25),
							_("{CMana: {W%d/%d{x", mob.mana, mob.mana).padRight(24));

		msg += "\r\n" + "-- Attributes ".padRight(80, "-");
		msg += "\r\n" + util.format("| %s %s %s |",
							_("{RStrength:       {W%d{x", mob.strength).padRight(25),
							_("{YAgility:        {W%d{x", mob.agility).padRight(25),
							_("{CIntelligence:   {W%d{x", mob.intelligence).padRight(24));
		msg += "\r\n" + util.format("| %s %s %s |",
							_("{R> Attack Power: {W%d{x", mob.attackPower).padRight(25),
							_("{Y> Speed:        {W%d{x", mob.speed).padRight(25),
							_("{C> Magic Power:  {W%d{x", mob.magicPower).padRight(24));
		msg += "\r\n" + util.format("| %s %s %s |",
							_("{R> Defense:      {W%d{x", mob.defense).padRight(25),
							_("{Y> Evasion:      {W%d{x", mob.evasion).padRight(25),
							_("{C> Resilience:   {W%d{x", mob.resilience).padRight(24));
		msg += "\r\n" + util.format("| %s %s %s |",
							_("{R> Vitality:     {W%d{x", mob.vitality).padRight(25),
							_("{Y> Stamina:      {W%d{x", mob.stamina).padRight(25),
							_("{C> Wisdom:       {W%d{x", mob.wisdom).padRight(24));*/
		msg += "\r\n" + "".center(80, "-");
		mob.sendLine(msg);
/*
		var msg = _(" {W%s the %s %s{x ", mob.name, mob.race.name, mob.class.name).center(80, "-");
		msg += "\r\n" + util.format("%s {R%s: %s/%s {x%s {Y%s: %s/%s {x%s {C%s: %s/%s {x%s", "|", _("Health"), String(mob.health).padLeft(7), String(mob.health).padRight(7), "|", _("Energy"), String(mob.energy).padLeft(7), String(mob.energy).padRight(8), "|", _("Mana"), String(mob.mana).padLeft(8), String(mob.mana).padRight(8), "|");
		msg += "\r\n" + util.format(" {W%s{x ", "Primary").center(80, "-");
		msg += "\r\n" + util.format("%s {R%s{x %s {Y%s{x %s {C%s{x %s", "|", "Strength".center(23), "|", "Agility".center(24), "|", "Intelligence".center(23), "|");
		msg += "\r\n" + util.format("%s {R%s{x %s {Y%s{x %s {C%s{x %s", "|", String(mob.strength).center(23), "|", String(mob.agility).center(24), "|", String(mob.intelligence).center(23), "|");
		msg += "\r\n" + util.format(" {W%s{x ", "Secondary").center(80, "-");
		msg += "\r\n" + util.format("%s {R%s: %s{x %s {Y%s: %s{x %s {C%s: %s{x %s", "|", _("Attack Power").padLeft(13), String(mob.attackPower).padRight(8), "|", _("Speed").padLeft(13), String(mob.speed).padRight(9), "|", _("Magic Power").padLeft(13), String(mob.magicPower).padRight(8), "|");
		msg += "\r\n" + util.format("%s {R%s: %s{x %s {Y%s: %s{x %s {C%s: %s{x %s", "|", _("Defense").padLeft(13), String(mob.defense).padRight(8), "|", _("Evasion").padLeft(13), String(mob.evasion).padRight(9), "|", _("Resilience").padLeft(13), String(mob.resilience).padRight(8), "|");
		msg += "\r\n" + util.format("%s {R%s: %s{x %s {Y%s: %s{x %s {C%s: %s{x %s", "|", _("Vitality").padLeft(13), String(mob.vitality).padRight(8), "|", _("Stamina").padLeft(13), String(mob.stamina).padRight(9), "|", _("Wisdom").padLeft(13), String(mob.wisdom).padRight(8), "|");
		msg += "\r\n" + util.format(" {W%s{x ", "Worth").center(80, "-");
		msg += "\r\n" + util.format("%s %s %s", "|", _("You are carrying {W%d{x items.", mob.contents.length).center(76), "|");
		msg += "\r\n" + util.format(" {W%s{x ", String(Math.rangeInt(1,100)).padLeft(3, "0")).center(80, "-");
		mob.sendLine(msg);
*/
	}
}

Score.prototype.rule = /^(?:s|sc|sco|scor|score)\b/;
Score.prototype.plain = "score";
Score.prototype.specificity = CommandSpecificity.LAST;

module.exports = Score;
