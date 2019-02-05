// node includes
const EventEmitter = require("events");

// local includes
const Communicate = require("./Communicate");

/**
 * Controls communication avenues.
 */
class Channel extends EventEmitter{
	/**
     * Construct a Channel.
     * @param {ChannelConstructorOptions} options 
     */
	constructor(options){
		super();
		this._participants = [];

		if(options){
			if(options.name != null) this.name = options.name;
		}
	}

	transmit(options){
		// adapt channel options to act options
		let cOptions = {};
		cOptions.actor = options.speaker;
		cOptions.message = this.format;
		cOptions.msg = options.message;
		if(options.target) cOptions.directObject = options.target;

		// process listeners
		let participants = this._participants;
		if(options.filter){
			let filter = options.filter;
			let filtered = [];
			for(let participant of participants) if(filter(participant, options)) filtered.push(participant);
			participants = filtered;
		}

		// adapt participants to recipients
		cOptions.recipients = participants;

		// communicate
		Communicate.act(cOptions);
	}

	add(player){
		if(this._participants.indexOf(player) !== -1) return; // already participating
		this._participants.push(player);
		player.joinChannel(this);
	}

	remove(player){
		let pos = this._participants.indexOf(player);
		if(pos === -1) return; // already not participating
		this._participants.splice(pos, 1);
		player.leaveChannel(this);
	}

	isParticipating(player){
		return this._participants.indexOf(player) !== -1;
	}

	static filterSpeakerTargetOnly(listener, options){
		if(listener === options.speaker) return true;
		if(listener === options.target) return true;
		return false;
	}
}

/**
 * This channel's name.
 */
Channel.prototype.name = null;

/**
 * Is this channel joined automatically?
 */
Channel.prototype.default = false;

/**
 * The message format for this channel.
 */
Channel.prototype.format = {
	firstPerson: "You: %s",
	thirdPerson: "%s: %s"
};

/**
 * List of players participating in this channel.
 * @alias Channel#participants
 */
Channel.prototype._participants = null;

module.exports = Channel;

/**
 * Sole valid argument for `new Channel()`.
 * @typedef {Object} ChannelConstructorOptions
 * @property {number} id
 * @property {string} name
 */
