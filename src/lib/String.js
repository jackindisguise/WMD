// node includes
const util = require("util");

// local includes
const Logger = require("../util/Logger");
const ColorCode = require("../etc/ColorCode");
const TelnetColor = require("../etc/TelnetColor");

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


String.prototype.colorize = function(client){
	if(client==="telnet") return this.replace(/\{(.)/g, function(full, char){
		switch(char){
		case "{": return "{";
		case "R": return TelnetColor.C_B_RED;
		case "r": return TelnetColor.C_RED;
		case "G": return TelnetColor.C_B_GREEN;
		case "g": return TelnetColor.C_GREEN;
		case "B": return TelnetColor.C_B_BLUE;
		case "b": return TelnetColor.C_BLUE;
		case "Y": return TelnetColor.C_B_YELLOW;
		case "y": return TelnetColor.C_YELLOW;
		case "P": return TelnetColor.C_B_MAGENTA;
		case "p": return TelnetColor.C_MAGENTA;
		case "C": return TelnetColor.C_B_CYAN;
		case "c": return TelnetColor.C_CYAN;
		case "W": return TelnetColor.C_B_WHITE;
		case "w": return TelnetColor.C_WHITE;
		case "D": return TelnetColor.C_D_GREY;
		case "x":
		default: return TelnetColor.CLEAR;
		}
	});

	if(client==="web") {
		let colors = 0;
		let clear;
		return this.replace(/\{(.)/g, function(full, char){
			switch(char){
			case "R": colors++; return "<font color='red'>";
			case "r": colors++; return "<font color='maroon'>";
			case "G": colors++; return "<font color='lime'>";
			case "g": colors++; return "<font color='green'>";
			case "B": colors++; return "<font color='blue'>";
			case "b": colors++; return "<font color='navy'>";
			case "Y": colors++; return "<font color='yellow'>";
			case "y": colors++; return "<font color='olive'>";
			case "P": colors++; return "<font color='magenta'>";
			case "p": colors++; return "<font color='purple'>";
			case "C": colors++; return "<font color='cyan'>";
			case "c": colors++; return "<font color='teal'>";
			case "W": colors++; return "<font color='white'>";
			case "w": colors++; return "<font color='silver'>";
			case "D": colors++; return "<font color='grey'>";
			case "x": clear = "</font>".repeat(colors); colors = 0; return clear;
			default:
				return char;
			}
		});
	}
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
