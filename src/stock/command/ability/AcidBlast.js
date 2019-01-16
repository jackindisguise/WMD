// local includes
const AbilityCommand = require("../../../mud/AbilityCommand");
const CommandSpecificity = require("../../../etc/CommandSpecificity");
const AbilityManager = require("../../../mud/manager/AbilityManager");
const acidblast = AbilityManager.getAbilityByName("acid blast");

class AcidBlast extends AbilityCommand{
	exec(mob, target){
		let victim = mob.loc.contents.search(target);
		if(victim){
			acidblast.use(mob, victim);
			return;
		}

		mob.sendMessage("Who do you wanna blast acid at?");
	}
}

AcidBlast.prototype.rule = /^(?:a|ac|aci|acid|acid b|acid bl|acid bla|acid blas|acid blast|b|bl|bla|blas|blast) (.+)/i;
AcidBlast.prototype.plain = "acid blast";
AcidBlast.prototype.specificity = CommandSpecificity.FIRST;
AcidBlast.prototype.ability = acidblast;
AcidBlast.prototype.ready = true;

module.exports = AcidBlast;
