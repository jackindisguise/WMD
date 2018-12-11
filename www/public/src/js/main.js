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

				// keepCommand
				if(options.keepCommand){
					$("#command")[0].select();
				} else {
					$("#command").val(null);
				}
	
				addMessage(line, "echo");
				command(line);
				break;
			}
		}

		switch(event.originalEvent.code){
			case "Numpad7":
				addMessage("nw", "echo");
				command("nw");
				break;
			case "Numpad8":
				addMessage("north", "echo");
				command("north");
				break;
			case "Numpad9":
				addMessage("ne", "echo");
				command("ne");
				break;
			case "Numpad4":
				addMessage("west", "echo");
				command("west");
				break;
			case "Numpad6":
				addMessage("east", "echo");
				command("east");
				break;
			case "Numpad1":
				addMessage("sw", "echo");
				command("sw");
				break;
			case "Numpad2":
				addMessage("south", "echo");
				command("south");
				break;
			case "Numpad3":
				addMessage("se", "echo");
				command("se");
				break;
		}
	});
});
