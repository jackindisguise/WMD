// node includes
var util = require("util");

// local includes
require("./String.js");
var ObjectManager = require("../mud/manager/ObjectManager");

Object.defineProperty(Object.prototype, "uuid", {
    get: function(){
        return ObjectManager.identify(this);
    }
});

/**
 * Check for matches to this Object's keywords member.
 * @function Object#matchKeywords
 * @returns {boolean}
 */
Object.defineProperty(Object.prototype, 'matchKeywords', {
    value: function(keywords){
        if(!("keywords" in this)) return false; // no keywords member, do nothing
        if(this.keywords.matchKeywords(keywords)) return true; // keywords member matches, return true
    }
});


class JSONBadProperty extends Error{
    constructor(message, constructor, json){
        super(util.format("Bad property '%s' not found in base class '%s'", message, constructor.name));
        this.class = constructor;
        this.json = json;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Write a value to a JSON object.
 */
Object.defineProperty(Object.prototype, '__JSONWrite', {
    value: function(key, value, json){
        if(this.constructor.prototype[key] === undefined) throw new JSONBadProperty(key, this.constructor, json) // don't have variable
        if(this.constructor.prototype[key] === value) return; // don't save default values
        if(typeof value === "function") return; // don't save functions
        if(typeof value === "object") return; // ignore objects
        if(typeof value === "array") return; // ignore arrays
        json[key] = value;
    }
});

/**
 * Convert an object to a JSON object.
 */
Object.defineProperty(Object.prototype, '__toJSON', {
    value: function(){
        var json = {constructor:this.constructor.name};
        for(var variable in this){
            this.__JSONWrite(variable, this[variable], json);
        }

        return json;
    }
});

/**
 * Read a value from a JSON object.
 */
Object.defineProperty(Object.prototype, '__JSONRead', {
    value: function(key, value){
        this[key] = value;
    }
});

/**
 * Read a JSON object to this object.
 */
Object.defineProperty(Object.prototype, '__fromJSON', {
    value: function(json){
        for(var variable in json){
            if(variable === "constructor") continue;
            this.__JSONRead(variable, json[variable]);
        }
    }
});

Object.defineProperty(Object.prototype, "__createClone", {
    value: function(){
        var json = this.__toJSON();
        var constructor = this.constructor;
        var clone = new constructor();
        clone.__fromJSON(json);
        return clone;
    }
});
