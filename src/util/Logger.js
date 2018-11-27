// npm includes
var winston = require("winston");

/**
 * Instance of a winston logger.
 */
module.exports = winston.createLogger({
	transports: [
		new (winston.transports.Console)({
			level: "silly",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(function(i) { return `[${i.timestamp}] <${i.level}> ${i.message}`; })	
			),
		}),
		new (winston.transports.File)({
			filename: `logs/${Date.now()}.log`,
			level: "silly",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(function(i) { return `[${i.timestamp}] <${i.level}> ${i.message}`; })	
			),
		})
	]
});
