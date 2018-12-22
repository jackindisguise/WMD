// local includes
require("./String");
require("./Math");

/**
 * Search all entries in an array and compare their keyword values.
 * @param {string} keywords
 * @returns {Object|string|null}
 */
Array.prototype.search = function(keywords){
    if(!keywords) return;
    var count = 1;
    // determine count
    var dot = /(\d+)\.(.+)/.exec(keywords);
    if(dot){
        count = dot[1];
        keywords = dot[2];
    }

    // find entry
    for(var entry of this){
        // if the array has plain strings, assume each string is a keyword
        if(typeof entry === "string") {
            if(entry.matchKeywords(keywords) && !(--count)) return entry; // return full string on match
        }

        else if(typeof entry === "object"){
            if("keywords" in entry) {
                if(entry.matchKeywords(keywords) && !(--count)) return entry; // return object on match
            }
        }
    }
}

/**
 * Pick a random element of this array.
 */
Array.prototype.pick = function(){
    if(this.length === 0) return;
    return this[Math.rangeInt(0,this.length-1)];
}