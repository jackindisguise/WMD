"use strict";

var options = {
	"keepCommand": true
}

var socket;
$(document).ready(function(){
	addMessage("Connecting...", "debug");
	socket = io.connect({
		reconnectionAttempts:0
	});
	configureSocket(socket);

	// focus the input immediately
	$("#command").focus();

	// start listening for enter keys
	$("#command").keydown(function(event) {
		switch(event.keyCode){
			case 13:{
				var line = $("#command").val();

				// keepmanualCommand
				if(options.keepCommand){
					$("#command")[0].select();
				} else {
					$("#command").val(null);
				}

				manualCommand(line);
				break;
			}
		}

		switch(event.originalEvent.code){
			case "Numpad7":
				manualCommand("nw");
				break;
			case "Numpad8":
				manualCommand("north");
				break;
			case "Numpad9":
				manualCommand("ne");
				break;
			case "Numpad4":
				manualCommand("west");
				break;
			case "Numpad6":
				manualCommand("east");
				break;
			case "Numpad1":
				manualCommand("sw");
				break;
			case "Numpad2":
				manualCommand("south");
				break;
			case "Numpad3":
				manualCommand("se");
				break;
		}
	});
});
