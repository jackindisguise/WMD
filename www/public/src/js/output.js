"use strict";

var currentCategory = null;
function addMessage(message, category, timestamp){
	// determine if the window is at the bottom
	var output = $("#output")[0];
	var bottom = output.scrollHeight - $("#output").height();
	var autoscroll = output.scrollTop == bottom;

	var dMessage = document.createElement("div");
	dMessage.className = "message";
	var now = Date.now();
	dMessage.sentTimestamp = timestamp;
	dMessage.receivedTimestamp = now;
	dMessage.latency = now - timestamp;

	// set new category
	$(dMessage).addClass(category);
	if(currentCategory && currentCategory != category) $(dMessage).addClass("new");
	currentCategory = category;

	// format message
	message = message.replace("<", "&lt;"); // remove HTML tags.
	message = message.replace(">", "&gt;");
	var dBody = document.createElement("div");
	dBody.className = "body";
	dBody.innerHTML = message;
	dMessage.appendChild(dBody);

	$("#output").append(dMessage);

	// autoscroll
	if(autoscroll) $("#output").scrollTop($("#output")[0].scrollHeight - $("#output").height());
}
