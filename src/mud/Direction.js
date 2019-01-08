/**
 * Directional flags.
 * @alias Direction#flags
 * @enum {bitflag}
 */
const flag = {
	NORTH: 0x1,
	SOUTH: 0x2,
	EAST: 0x4,
	WEST: 0x8,
	NORTHEAST: 0x1|0x4,
	NORTHWEST: 0x1|0x8,
	SOUTHEAST: 0x2|0x4,
	SOUTHWEST: 0x2|0x8,
	UP: 0x10,
	DOWN: 0x20
};

/**
 * Long direction names.
 * @alias Direction#long
 * @enum {string}
 */
const long = {
	NORTH: "north",
	SOUTH: "south",
	EAST: "east",
	WEST: "west",
	NORTHEAST: "northeast",
	NORTHWEST: "northwest",
	SOUTHEAST: "southeast",
	SOUTHWEST: "southwest",
	UP: "up",
	DOWN: "down"
};

/**
 * Short direction names.
 * @alias Direction#short
 * @enum {string}
 */
const short = {
	NORTH: "n",
	SOUTH: "s",
	EAST: "e",
	WEST: "w",
	NORTHEAST: "ne",
	NORTHWEST: "nw",
	SOUTHEAST: "se",
	SOUTHWEST: "sw",
	UP: "u",
	DOWN: "d"
};

/**
 * Provides direction functionality.
 */
class Direction{
	static get flag(){
		return flag;
	}

	static get long(){
		return long;
	}

	static get short(){
		return short;
	}

	static flag2name(flag){
		for(var name of flag){
			if(flag[name] === flag) return name;
		}
	}

	static flag2long(flag){
		for(var name of flag){
			if(flag[name] === flag) return long[name];
		}
	}

	static flag2short(flag){
		for(var name of flag){
			if(flag[name] === flag) return short[name];
		}
	}

	static short2flag(short){
		for(var name of short){
			if(short[name] === short) return flag[name];
		}
	}

	static long2flag(long){
		for(var name of long){
			if(long[name] === long) return flag[name];
		}
	}
}

module.exports = Direction;
