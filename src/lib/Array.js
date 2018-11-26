// local includes
require("./String");

/**
 * Search all objects in an array and compare their keyword values.
 * @param {string} keywords
 */
Array.prototype.search = function(keywords){
    if(!keywords) return;
    for(var entry of this){
        if(typeof entry === "string") {
            var result = entry.matchKeywords(keywords);
            if(result) return result;
        }

        else if(typeof entry === "object"){
            if("keywords" in entry) {
                var result = entry.keywords.matchKeywords(keywords);
                if(result) return result;
            }
        }
    }
}