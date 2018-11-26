// local includes
require("./String");

/**
 * Search all entries in an array and compare their keyword values.
 * @param {string} keywords
 * @returns {Object|string|null}
 */
Array.prototype.search = function(keywords){
    if(!keywords) return;
    for(var entry of this){
        // if the array has plain strings, assume each string is a keyword
        if(typeof entry === "string") {
            if(entry.matchKeywords(keywords)) return entry; // return full string on match
        }

        else if(typeof entry === "object"){
            if("keywords" in entry) {
                if(entry.matchKeywords(keywords)) return entry; // return object on match
            }
        }
    }
}