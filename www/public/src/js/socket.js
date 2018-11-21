"use strict";

function configureSocket(socket){
	socket.on("connect", function(){
		addMessage("Successfully connected!", "debug");
	});

	socket.on("reconnect_attempt", function(attemptN){
		addMessage(`Attempting to reconnect (x${attemptN})...`, "debug");
	});
	socket.on("reconnect_failed", function(){
		addMessage("Failed to reconnect!", "debug");
	});

	socket.on("disconnect", function(){
		addMessage("Disconnected from webMUD!", "debug");
	});

	socket.on('message', function (message, timestamp) {
		console.log(arguments);
		addMessage(message, timestamp);
		var escaped = message.replace(/\<.*?\>/g, "").replace(/\<br\/?\>/,"\r\n");
		console.log(escaped);
	});

	socket.on("_error", function(body){
		addMessage(body, "error");
	});
}