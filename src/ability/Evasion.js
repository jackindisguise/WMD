// local includes
const PassiveAbility = require("../mud/PassiveAbility");

class Evasion extends PassiveAbility{
}

Evasion.prototype.name = "evasion";
Evasion.prototype.display = "evasion";
Evasion.prototype.keywords = "evasion";

module.exports = Evasion;
