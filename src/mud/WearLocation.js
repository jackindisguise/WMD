/**
 * Valid wear locations for equipment.
 */
var location = {
	HEAD: "HEAD",
	NECK: "NECK",
	SHOULDER: "SHOULDER",
	ARMS: "ARMS",
	HANDS: "HANDS",
	FINGER: "FINGER",
	TORSO: "TORSO",
	WAIST: "WAIST",
	LEGS: "LEGS",
	FEET: "FEET",
	HOLD: "HOLD",
	WEAPON: "WEAPON",
	SHIELD: "SHIELD"
};

/**
 * Public names for wear locations.
 */
var display = {
	HEAD: "head",
	NECK: "neck",
	SHOULDER: "shoulder",
	ARMS: "arms",
	HANDS: "hands",
	FINGER: "finger",
	TORSO: "torso",
	WAIST: "waist",
	LEGS: "legs",
	FEET: "feet",
	HOLD: "hold",
	WEAPON: "weapon",
	SHIELD: "shield"
};

class WearLocation{
	static get location(){
		return location;
	}

	static get display(){
		return display;
	}
}

module.exports = WearLocation;
