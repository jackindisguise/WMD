require("../../lib/Array");

var channels = [];

class ChannelManager{
	static get channels(){
		return channels;
	}

	static add(channel){
		if(channels.indexOf(channel) != -1) return;
		channels.push(channel);
	}

	static remove(channel){
		var pos = channels.indexOf(channel);
		if(pos == -1) return;
		channels.splice(pos, 1);
	}

	static getChannelByKeywords(keywords){
		return channels.search(keywords);
	}

	static getChannelByID(id){
		for(var channel of channels){
			if(channel.id === id) return channel;
		}
	}
}

module.exports = ChannelManager;
