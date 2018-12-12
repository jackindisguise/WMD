"use strict";

function echo(input){
	addMessage(input, "echo", null, false);
}

function manualCommand(input){
	echo(input);
	command(input);
}

function command(input){
	socket.emit("command", input);
}
