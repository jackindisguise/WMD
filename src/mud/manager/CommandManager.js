var _commands = [];

class CommandManager{
	static add(command){
		if(_commands.indexOf(command) != -1) return;
		_commands.push(command);
	}

	static remove(command){
		var pos = _commands.indexOf(command);
		if(pos == -1) return;
		_commands.splice(pos, 1);
	}

	static sortCommandsBySpecificity(){
		_commands.sort(function(a,b){
			return b.specificity - a.specificity;
		});
	}

	static processCommand(mob, input){
		for(var command of _commands){
			if(command.match(mob, input)) {
				command.run(mob, input);
				return true;
			}
		}

		return false;
	}
}

module.exports = CommandManager;
