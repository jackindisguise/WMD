/**
 * Valid telnet commands.
 * @readonly
 * @enum {Number}
 */
let TelnetCommand = {
	IAC:	255,
	DONT:	254,
	DO:		253,
	WONT:	252,
	WILL:	251,
	SB:		250,
	GA:		249,
	EL:		248,
	EC:		247,
	SE:		240,
	EOR:	239,
	ABORT:	238,
	SUSP:	237,
	xEOF:	236
};

// not sure what this is for
TelnetCommand.names = Object.keys(TelnetCommand);

// convert code to name
TelnetCommand.name = function(command){
	for(let key in TelnetCommand){
		if(TelnetCommand[key] === command) return key;
	}

	return undefined;
};

module.exports = TelnetCommand;
