/**
 * Enum for command specificity.
 * More specific commands should be processed first.
 * @enum {string}
 */
const CommandSpecificity = {
	FIRST:100,
	LAST:-100
};

module.exports = CommandSpecificity;
