// node includes
var util = require("util");

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
 * Check for matches to this string's keywords.
 * @param {string} match
 */
String.prototype.matchKeywords = function(match){
	if(!match) return null;
	var words = this.split(/\s+/);
	var matchWords = match.split(/\s+/);
	for(var matchWord of matchWords){
		var found = false;
		for(var word of words){
			if(word.indexOf(matchWord) == 0) {
				found = true;
				break;
			}
		}

		if(!found) return;
	}

	return this;
}

/**
 * Centers a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.center = function(size, padder=" "){
	var pad = size - this.length;
	if(pad < 1) return this;
	if(pad == 1) return util.format("%s%s", this, " ");
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
	if(pad == 1) return util.format("%s%s", " ", this);
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
	if(pad == 1) return util.format("%s%s", this, " ");
	return util.format("%s%s", this, padder.repeat(pad));
};