"use strict";

function addMessage(message,_class){
	// determine if the window is at the bottom
	var output = $("#output")[0];
	var bottom = output.scrollHeight - $("#output").height();
	var autoscroll = output.scrollTop == bottom;

	var dMessage = document.createElement("div");
	dMessage.className = "message";
	dMessage.timestamp = Date.now();
	console.log(_class);
	if(_class) $(dMessage).addClass(_class);

	// format message
	message = message.replace("<", "&lt;"); // remove HTML tags.
	message = message.replace(">", "&gt;");
	var dBody = document.createElement("div");
	dBody.className = "body";
	dBody.innerHTML = message;
	dMessage.appendChild(dBody);

	var dClear = document.createElement("div");
	dClear.className = "clear";
	dMessage.appendChild(dClear);

	$("#output").append(dMessage);

	// autoscroll
	if(autoscroll) $("#output").scrollTop($("#output")[0].scrollHeight - $("#output").height());
}
