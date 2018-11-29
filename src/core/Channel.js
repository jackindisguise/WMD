// node includes
var EventEmitter = require("events");
var util = require("util");

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
            if(options.id != null) this.id = options.id;
            if(options.name != null) this.name = options.name;
        }
    }

    get participants(){
        return this._participants;
    }

    chat(speaker, message, filter){
        for(var target of this._participants){
            if(filter && !filter(speaker, target)) continue // filtered out this target
            if(target == speaker) target.sendMessage(util.format(this.format.firstPerson, message));
            else target.sendMessage(util.format(this.format.firstPerson, speaker.mob.name ? speaker.mob.name : speaker.socketID, message));
        }
    }

    add(player){
        if(this._participants.indexOf(player) != -1) return; // already participating
        this._participants.push(player);
        player.joinChannel(this);
    }

    remove(player){
        var pos = this._participants.indexOf(player);
        if(pos == -1) return; // already not participating
        this._participants.splice(pos, 1);
        player.leaveChannel(this);
    }

    isParticipating(player){
        return this._participants.indexOf(player) != -1;
    }
}

/**
 * Is this channel joined automatically?
 */
Channel.prototype.default = false;

/**
 * The message format for this channel.
 * @type {ActFormat}
 */
Channel.prototype.format = {
    firstPerson: "You: $m",
    thirdPerson: "$n: $m"
}

/**
 * List of players participating in this channel.
 * @alias Channel#participants
 */
Channel.prototype._participants = null;

/**
 * This channel's ID.
 */
Channel.prototype.id = null;

/**
 * This channel's name.
 */
Channel.prototype.name = null;

module.exports = Channel;

/**
 * Sole valid argument for `new Channel()`.
 * @typedef {Object} ChannelConstructorOptions
 * @property {number} id
 * @property {string} name
 */
