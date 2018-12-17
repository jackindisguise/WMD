// node includes
var util = require("util");

// local includes
var ColorCode = require("../mud/ColorCode");

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
	var pad = size - this.length + this.getColorSize();
	if(pad < 1) return this;
	if(pad == 1) return util.format("%s%s", this, padder);
	var remainder = pad%2;
	pad -= remainder;
	pad = Math.floor(pad / padder.length);
	return util.format("%s%s%s", padder.repeat(pad/2), this, padder.repeat((pad/2) + remainder));
};

/**
 * Pads the left side of a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.padLeft = function(size, padder=" "){
	var pad = size - this.length + this.getColorSize();
	if(pad < 1) return this;
	if(pad == 1) return util.format("%s%s", padder, this);
	pad = Math.floor(pad / padder.length);
	return util.format("%s%s", padder.repeat(pad), this);
};

/**
 * Pads teh right side of a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.padRight = function(size, padder=" "){
	var pad = size - this.length + this.getColorSize();
	if(pad < 1) return this;
	if(pad == 1) return util.format("%s%s", this, padder);
	pad = Math.floor(pad / padder.length);
	return util.format("%s%s", this, padder.repeat(pad));
};

String.prototype.getColorSize = function(){
	var size = 0;
	var rule = new RegExp(`${ColorCode.ESCAPE}(.)`, "g");
	var result;
	while(result = rule.exec(this)){
		switch(result[1]){
			case ColorCode.CLEAR:
			case ColorCode.CRIMSON:
			case ColorCode.MAROON:
			case ColorCode.LIME:
			case ColorCode.DARK_GREEN:
			case ColorCode.BLUE:
			case ColorCode.NAVY:
			case ColorCode.YELLOW:
			case ColorCode.OLIVE:
			case ColorCode.PINK:
			case ColorCode.PURPLE:
			case ColorCode.CYAN:
			case ColorCode.TEAL:
			case ColorCode.WHITE:
			case ColorCode.SILVER:
			case ColorCode.GREY:
				size += 2;
				break;

			default:
				size++;
				break;
		}
	}

	return size;
}
