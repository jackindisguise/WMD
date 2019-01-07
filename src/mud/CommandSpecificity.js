/**
 * Enum for command specificity.
 * More specific commands should be processed first.
 * @enum {string}
 */
const CommandSpecificity = module.exports = {
    FIRST:100,
    LAST:-100
};
