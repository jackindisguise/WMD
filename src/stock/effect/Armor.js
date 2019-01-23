const EffectName = require("../../etc/EffectName");
const Effect = require("../../mud/Effect");
const Message = require("../../etc/Message");

class Armor extends Effect{
	get defense(){
		return 1 + Math.floor(this.level / 2);
	}

	get vitality(){
		return 1 + Math.floor(this.level / 2);
	}
}

Armor.prototype.name = EffectName.ARMOR;
Armor.prototype.applyMessage = Message.EffectApplyArmor;
Armor.prototype.expireMessage = Message.EffectExpireArmor;

module.exports = Armor;
