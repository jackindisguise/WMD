// node includes
var EventEmitter = require("events");

/**
 * Controls communication avenues.
 */
class Channel extends EventEmitter{
    constructor(options){
        super();
        this._participants = [];

        if(options){
            if(options.id != null) this._id = options.id;
            if(options.name != null) this._name = options.name;
        }
    }

    get participants(){
        return this._participants;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    add(player){
        if(this._participants.indexOf(player) != -1) return; // already participating
        this._participants.push(player);
    }

    remove(player){
        var pos = this._participants.indexOf(player);
        if(pos == -1) return; // already not participating
        this._participants.splice(pos, 1);
    }
}

/**
 * List of players participating in this channel.
 */
Channel.prototype._participants = null;

/**
 * This channel's ID.
 */
Channel.prototype._id = null;

/**
 * This channel's name.
 */
Channel.prototype._name = null;
