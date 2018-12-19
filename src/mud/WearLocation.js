/**
 * Valid wear locations for equipment.
 */
var locations = {
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
	WEAPON: "WEAPON"
};

var slots = {
	HEAD: "HEAD",
	NECK: "NECK",
	SHOULDER: "SHOULDER",
	ARMS: "ARMS",
	HANDS: "HANDS",
	FINGER_A: "FINGER_A",
	FINGER_B: "FINGER_B",
	TORSO: "TORSO",
	WAIST: "WAIST",
	LEGS: "LEGS",
	FEET: "FEET",
	HAND_OFF: "HAND_OFF",
	HAND_PRIMARY: "HAND_PRIMARY"
};

var slotNames = {
	HEAD: "head",
	NECK: "neck",
	SHOULDER: "shoulder",
	ARMS: "arms",
	HANDS: "hands",
	FINGER_A: "left ring finger",
	FINGER_B: "right ring finger",
	TORSO: "torso",
	WAIST: "waist",
	LEGS: "legs",
	FEET: "feet",
	HAND_OFF: "offhand",
	HAND_PRIMARY: "primary hand"
};

/**
 * Public names for wear locations.
 */
var locationNames = {
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
	WEAPON: "weapon"
};

class WearLocation{
	static get locations(){
		return locations;
	}

	static get locationNames(){
		return locationNames;
	}

	static get slots(){
		return slots;
	}

	static get slotNames(){
		return slotNames;
	}
}

module.exports = WearLocation;
