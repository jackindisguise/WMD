var slot = {
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

var display = {
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

class WearSlot{
	static get slot(){
		return slot;
	}

	static get display(){
		return display;
	}
}

module.exports = WearSlot;
