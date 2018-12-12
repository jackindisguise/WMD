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

	// add timestamp
	var dTimestamp = document.createElement("div");
	dTimestamp.className = "timestamp";
	dTimestamp.style.float = "left";
	dTimestamp.style.width = "50px";
	dTimestamp.style.lineHeight = "17px";
	dTimestamp.style.fontSize = "50%";
	dTimestamp.style.textAlign = "center";
	var date = new Date(now);
	dTimestamp.innerHTML = `${String(date.getHours())}:${String(date.getMinutes())}:${String(date.getSeconds())}`;
	dMessage.appendChild(dTimestamp);

	// format message
	message = message.replace("<", "&lt;"); // remove HTML tags.
	message = message.replace(">", "&gt;");

	// add color
	if(color){
		var color = 0;
		message = message.replace(/{(.)/g, function(a, b){
			switch(b){
				case "R": color++; return "<font color='red'>";
				case "r": color++; return "<font color='maroon'>";
				case "G": color++; return "<font color='lime'>";
				case "g": color++; return "<font color='green'>";
				case "B": color++; return "<font color='blue'>";
				case "b": color++; return "<font color='navy'>";
				case "Y": color++; return "<font color='yellow'>";
				case "y": color++; return "<font color='olive'>";
				case "P": color++; return "<font color='pink'>";
				case "p": color++; return "<font color='purple'>";
				case "C": color++; return "<font color='cyan'>";
				case "c": color++; return "<font color='teal'>";
				case "W": color++; return "<font color='white'>";
				case "w": color++; return "<font color='silver'>";
				case "D": color++; return "<font color='grey'>";
				case "x": var ocolor = color; color = 0; return "</font>".repeat(ocolor);
				default:
					return b;
			}
		});
	}

	// add body
	var dBody = document.createElement("div");
	dBody.className = "body";
	dBody.innerHTML = message;
	dBody.style.float = "left";
	dBody.style.marginLeft = "10px";
	dMessage.appendChild(dBody);

	// add clear
	var dClear = document.createElement("div");
	dClear.style.clear = "both";
	dMessage.appendChild(dClear);

	$("#output").append(dMessage);

	// autoscroll
	if(autoscroll) $("#output").scrollTop($("#output")[0].scrollHeight - $("#output").height());
}
