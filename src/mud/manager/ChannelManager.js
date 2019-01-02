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

	static getChannelByName(name){
		for(var channel of channels){
			if(channel.name === name) return channel;
		}
	}
}

module.exports = ChannelManager;
