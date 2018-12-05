require("../../lib/Array");

var _channels = [];

class ChannelManager{
	static get channels(){
		return _channels;
	}

	static add(channel){
		if(_channels.indexOf(channel) != -1) return;
		_channels.push(channel);
	}

	static remove(channel){
		var pos = _channels.indexOf(channel);
		if(pos == -1) return;
		_channels.splice(pos, 1);
	}

	static getChannelByKeywords(keywords){
		return _channels.search(keywords);
	}

	static getChannelByID(id){
		for(var channel of _channels){
			if(channel.id === id) return channel;
		}
	}
}

module.exports = ChannelManager;
