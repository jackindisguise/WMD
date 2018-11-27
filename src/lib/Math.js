// I've been told this kind of behavior is immortal, but I don't care. Gonna keep doing it even if you ban me.

/**
 * Provides linear interpolation functionality.
 * @param {Number} min Minimum value of result.
 * @param {Number} max Maximum value of result.
 * @param {Number} mod Value from 0 to 1.
 * @return Returns a value from `min` to `max`.
 * `mod` determines the distance between the 2 points, with `0` being equivalent to `min`,
 * `1` being equivalent to `max`, and `0.5` being equivalent to `(min+max)/2`.
 */
Math.lerp = function(min,max,mod){
    return min + (max-min)*mod;
}

/**
 * Generate a random integer in a range.
 * @param {Number} min Smallest number generated.
 * @param {Number} max Largest number generated.
 * @return A random integer between `min` and `max`.
 */
Math.rangeInt = function(min,max){
    return Math.floor(Math.lerp(min,max+1,Math.random()));
}

/*
 * Math.probability(p) results over 1,000,000 rolls for each value of p.
 * p	    actual
 * 0.25	    0.250014
 * 0.5	    0.500104
 * 0.75 	0.75066
 * 0.9	    0.900152
 * 0.99 	0.989998
 * 0.999	0.999006
 * 0.9999	0.999917
 * 0.99999	0.999991
 */

/**
 * Check if a probability roll came up positive.
 * @param {Number} p Percent chance of occurring. Should be number from 0 to 1.
 * @return {boolean} `true` on success. `false` otherwise.
 */
Math.probability = function(p){
    if(p===0) return false;
    if(p===1) return true;
    return Math.random() < p;
}

/**
 * Simulates a dice roll of `die` die with `sides` sides.
 * @param {Number} die Number of die to roll.
 * @param {Number} sides Number of sides per die.
 * @param {Number} mod Number added to final result.
 * @return {?Number} A number in the range of `die` to `sides*die`.
 */
Math.roll = function(die,sides,mod){
    return Math.rangeInt(die,sides*die)+mod;
}

/**
 * Simulates a dice roll using a dice notation.<br/>
 * Examples: `1d6`, `1d12+12`, `12d12-12`
 * @param {String} string String using dice notation.
 * @return {?Number} The results of a dice roll using the given string.
 */
Math.rollString = function(string){
    var result = string.match(/(\d+)d(\d+)(?:([\-\+])(\d+))?/);
    if(!result) return null;
    return Math.roll(Number(result[1]),Number(result[2]),(result[3] === "-") ? 0-Number(result[4]) : Number(result[4]));
}