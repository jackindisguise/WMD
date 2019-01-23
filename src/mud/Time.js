class Time{
	static getIntervalDelay(interval){
		let delay = interval - (Date.now() % interval);
		return delay;
	}
}

module.exports = Time;
