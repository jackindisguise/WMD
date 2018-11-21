"use strict";

function colorize(string){
	var regex = /\[\#(.*?)\]/g;
	var otags = 0;
	var colorized = string.replace(regex, function(matched, code){
		if(!code) {
			otags--;
			return "</span>";
		}

		// long hex
		var reg = code.match(/^([0-9a-fA-F][0-9a-fA-F])([0-9a-fA-F][0-9a-fA-F])([0-9a-fA-F][0-9a-fA-F])([0-9a-fA-F][0-9a-fA-F])?$/);
		if(reg){
			otags++;
			return `<span style='color:#${reg[1]}${reg[2]}${reg[3]}${reg[4] == null ? "" : reg[4]};'>`;
		} else {
			// short hex
			reg = code.match(/^([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])?$/);
			if(reg){
				otags++;
				return `<span style='color:#${reg[1]}${reg[2]}${reg[3]}${reg[4] == null ? "" : reg[4]};'>`;

			// bad code
			} else {
				return "";
			}
		}
	});

	while(otags>0){
		string += "</span>";
		otags--;
	}

	return colorized;
}

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
	message = colorize(message);
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
