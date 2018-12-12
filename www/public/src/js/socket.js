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
		addMessage("Disconnected!", "debug");
	});

	socket.on('message', function (message, category, timestamp) {
		addMessage(message, category, timestamp, true);
	});

	socket.on("_error", function(body){
		addMessage(body, "error");
	});
}