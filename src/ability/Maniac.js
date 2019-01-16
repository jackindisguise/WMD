// local includes
const PassiveAbility = require("../mud/ability/PassiveAbility");

class Maniac extends PassiveAbility{
}

Maniac.prototype.name = "maniac";
Maniac.prototype.display = "maniac";
Maniac.prototype.keywords = "maniac";

module.exports = Maniac;
