// node includes
var EventEmitter = require("events");

// local includes
var Communicate = require("./Communicate");
var MessageCategory = require("./MessageCategory");

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

    transmit(speaker, message, filter){
        Communicate.act(speaker, this.format, this._participants, {message:message}, filter, MessageCategory.CHAT);
    }

    add(mob){
        if(this._participants.indexOf(mob) != -1) return; // already participating
        this._participants.push(mob);
        mob.joinChannel(this);
    }

    remove(mob){
        var pos = this._participants.indexOf(mob);
        if(pos == -1) return; // already not participating
        this._participants.splice(pos, 1);
        mob.leaveChannel(this);
    }

    isParticipating(mob){
        return this._participants.indexOf(mob) != -1;
    }
}

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
