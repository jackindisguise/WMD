"use strict";

var currentCategory = null;
function addMessage(message, category, timestamp, color){
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

	// add color
	if(color){
		var colors = 0;
		message = message.replace(/{(.)/g, function(a, b){
			switch(b){
			case "R": colors++; return "<font color='red'>";
			case "r": colors++; return "<font color='maroon'>";
			case "G": colors++; return "<font color='lime'>";
			case "g": colors++; return "<font color='green'>";
			case "B": colors++; return "<font color='blue'>";
			case "b": colors++; return "<font color='navy'>";
			case "Y": colors++; return "<font color='yellow'>";
			case "y": colors++; return "<font color='olive'>";
			case "P": colors++; return "<font color='magenta'>";
			case "p": colors++; return "<font color='purple'>";
			case "C": colors++; return "<font color='cyan'>";
			case "c": colors++; return "<font color='teal'>";
			case "W": colors++; return "<font color='white'>";
			case "w": colors++; return "<font color='silver'>";
			case "D": colors++; return "<font color='grey'>";
			case "x": var ocolors = colors; colors = 0; return "</font>".repeat(ocolors);
			default:
				return b;
			}
		});
	}

	// add body
	var dBody = document.createElement("span");
	dBody.className = "body";
	dBody.innerHTML = message;
	dMessage.appendChild(dBody);

	// add timestamp
	var dTimestamp = document.createElement("span");
	dTimestamp.className = "timestamp";
	dTimestamp.style.marginLeft = "10px";
	dTimestamp.style.display = "none";
	var date = new Date(now);
	dTimestamp.innerHTML = `[${String(date.getHours())}:${String(date.getMinutes())}:${String(date.getSeconds())}]`;
	dMessage.appendChild(dTimestamp);

	$("#output").append(dMessage);

	// autoscroll
	if(autoscroll) $("#output").scrollTop($("#output")[0].scrollHeight - $("#output").height());
}
