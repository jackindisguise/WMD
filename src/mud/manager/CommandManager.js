let commands = [];

class CommandManager{
	static get commands(){
		return commands;
	}
	static add(command){
		if(commands.indexOf(command) !== -1) return;
		commands.push(command);
	}

	static remove(command){
		let pos = commands.indexOf(command);
		if(pos === -1) return;
		commands.splice(pos, 1);
	}

	static sortCommandsBySpecificity(){
		commands.sort(function(a,b){
			return b.specificity - a.specificity;
		});
	}

	static processCommand(mob, input){
		for(let command of commands){
			if(command.match(mob, input)) {
				if(command.ready){
					if(!mob.ready){
						mob.sendLine("You aren't ready.");
						return true; // we found the command, just can't use it right now.
					}
				}

				command.run(mob, input);
				return true;
			}
		}

		return false;
	}
}

module.exports = CommandManager;
