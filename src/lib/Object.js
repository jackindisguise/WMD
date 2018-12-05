// local includes
require("./String.js");

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

/**
 * Write a value to a JSON object.
 */
Object.defineProperty(Object.prototype, '__JSONWrite', {
    value: function(key, value, json){
        if(this.constructor.prototype[key] == value) return; // don't save default values
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
        var json = {};
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
            this.__JSONRead(variable, json[variable]);
        }
    }
});