// local includes
const AbilityCommand = require("../../AbilityCommand");
const CommandSpecificity = require("../../CommandSpecificity");
const AbilityManager = require("../../manager/AbilityManager");
const acidblast = AbilityManager.getAbilityByName("acid blast");

class AcidBlast extends AbilityCommand{
	exec(mob){
		if(!mob.fighting){
			mob.sendLine("You're not fighting anyone.");
			return;
		}

		acidblast.use(mob, mob.fighting);
	}
}

AcidBlast.prototype.rule = /^(?:a|ac|aci|acid|acid b|acid bl|acid bla|acid blas|acid blast|b|bl|bla|blas|blast)$/i;
AcidBlast.prototype.plain = "acid blast";
AcidBlast.prototype.specificity = CommandSpecificity.FIRST;
AcidBlast.prototype.ability = "acid blast";
AcidBlast.prototype.ready = true;

module.exports = AcidBlast;
