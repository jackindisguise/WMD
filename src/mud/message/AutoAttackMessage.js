const CombatManager = require("../manager/CombatManager");

const AutoAttackMessage = {
	me:function(options){
		let msg = AutoAttackMessage("You start circling around %s.", options.target.display);
		this.sendMessage(msg, CombatManager.category);
	},
	you:function(options){
		let msg = AutoAttackMessage("%s starts circling around you.", options.actor.display);
		this.sendMessage(msg, CombatManager.category);
	},
	other:function(options){
		let msg = AutoAttackMessage("%s starts circling around %s.", options.actor.display, options.target.display);
		this.sendMessage(msg, CombatManager.category);
	},
	send:function(options){
		if(this === options.actor) { // first person
			return AutoAttackMessage.me.call(this, options);
		} else if(this === options.directObject && AutoAttackMessage.you) { // second person
			return AutoAttackMessage.you.call(this, options);
		} else { // third person
			return AutoAttackMessage.other.call(this, options);
		}
	}
};

return AutoAttackMessage;
