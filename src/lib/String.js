// node includes
var util = require("util");

/**
 * Check for matches to this string's keywords.
 * @param {string} match
 * @param {boolean} sensitive Case sensitivity option.
 */
String.prototype.matchKeywords = function(match, sensitive=false){
	if(!match) return false;
	var words = (sensitive ? this : this.toLowerCase()).split(/\s+/);
	var matchWords = (sensitive ? match : match.toLowerCase()).split(/\s+/);
	for(var matchWord of matchWords){
		var found = false;
		for(var word of words){
			if(word.indexOf(matchWord) == 0) {
				found = true;
				break;
			}
		}

		if(!found) return false;
	}

	return true;
}

/**
 * Repeat a string.
 * @param {number} num
 */
String.prototype.repeat = function(num){
	var str = this;
	for(var i=0;i<num-1;i++) str += this;
	return str;
}

/**
 * Centers a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.center = function(size, padder=" "){
	var pad = size - this.length;
	if(pad < 1) return this;
	if(pad == 1) return util.format("%s%s", this, padder);
	var remainder = pad%2;
	pad -= remainder;
	return util.format("%s%s%s", padder.repeat(pad/2), this, padder.repeat((pad/2) + remainder));
};

/**
 * Pads the left side of a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.padLeft = function(size, padder=" "){
	var pad = size - this.length;
	if(pad < 1) return this;
	if(pad == 1) return util.format("%s%s", padder, this);
	return util.format("%s%s", padder.repeat(pad), this);
};

/**
 * Pads teh right side of a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.padRight = function(size, padder=" "){
	var pad = size - this.length;
	if(pad < 1) return this;
	if(pad == 1) return util.format("%s%s", this, padder);
	return util.format("%s%s", this, padder.repeat(pad));
};