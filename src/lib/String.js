// node includes
const util = require("util");

// local includes
const Logger = require("../util/Logger");
const ColorCode = require("../mud/ColorCode");

/**
 * Check for matches to this string's keywords.
 * @param {string} match
 * @param {boolean} sensitive Case sensitivity option.
 */
String.prototype.matchKeywords = function(match, sensitive=false){
	if(!match) return false;
	let words = (sensitive ? this : this.toLowerCase()).split(/\s+/);
	let matchWords = (sensitive ? match : match.toLowerCase()).split(/\s+/);
	for(let matchWord of matchWords){
		let found = false;
		for(let word of words){
			if(word.indexOf(matchWord) === 0) {
				found = true;
				break;
			}
		}

		if(!found) return false;
	}

	return true;
};

/**
 * Repeat a string.
 * @param {number} num
 */
String.prototype.repeat = function(num){
	let str = this;
	for(let i=0;i<num-1;i++) str += this;
	return str;
};

/**
 * Centers a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.center = function(size, padder=" "){
	let pad = size - this.length + this.getColorSize();
	if(pad < 1) return this;
	if(pad === 1) return util.format("%s%s", this, padder);
	let remainder = pad%2;
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
	let pad = size - this.length + this.getColorSize();
	if(pad < 1) return this;
	if(pad === 1) return util.format("%s%s", padder, this);
	pad = Math.floor(pad / padder.length);
	return util.format("%s%s", padder.repeat(pad), this);
};

/**
 * Pads teh right side of a string.
 * @param {number} size
 * @param {string} padder
 */
String.prototype.padRight = function(size, padder=" "){
	let pad = size - this.length + this.getColorSize();
	if(pad < 1) return this;
	if(pad === 1) return util.format("%s%s", this, padder);
	pad = Math.floor(pad / padder.length);
	return util.format("%s%s", this, padder.repeat(pad));
};

String.prototype.getColorSize = function(){
	let size = 0;
	let rule = new RegExp(`${ColorCode.ESCAPE}(.)`, "g");
	let result = rule.exec(this);
	while(result){
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

		// find next result
		result = rule.exec(this);
	}

	return size;
};

/**
 * Tie values in a string to a list of options.
 */
String.prototype.tie = function(options){
	return this.replace(/\$\{(.*?)\}/g, function(full, code){
		let levels = code.split(".");

		// only 1 level
		if(levels.length === 1) {
			if(options[levels[0]] === undefined) { // field not there
				Logger.error(util.format("BAD STRING TIE: %s '%s'", code, this));
				return "???";
			}

			return options[levels[0]]; // has field. return it
		}

		// multiple levels
		let current = options;
		for(let next of levels){
			// doesn't have property
			if(current[next] === undefined) { // field not there
				Logger.error(util.format("BAD STRING TIE: %s '%s'", code, this));
				return "???";
			}

			current = current[next];
		}

		// return final value
		return current;
	}.bind(this));
};
