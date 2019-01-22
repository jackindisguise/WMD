const Effect = require("../../mud/Effect");
const Message = require("../../etc/Message");

class Armor extends Effect{
	get defense(){
		return Math.floor(1 + this.level * 0.25);
	}
}

Armor.prototype.name = "armor";
Armor.prototype.applyMessage = Message.EffectApplyArmor;
Armor.prototype.expireMessage = Message.EffectExpireArmor;

module.exports = Armor;
