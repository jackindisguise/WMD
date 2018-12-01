// local includes
var Logger = require("../util/Logger");
var Mob = require("./map/Mob");

class Command{
    // match to input
    match(mob, input){
        return this.rule.exec(input) ? true : false;
    }

    run(mob, input){
       var args = this.process(mob, input);
       args.unshift(mob);
       this.exec.apply(this, args);
    }

    process(mob, input){
        var result = this.rule.exec(input);
        if(result) return result.slice(1);
    }

    exec(){
    }
}

/**
 * Regex rule for matching input to this command.
 */
Command.prototype.rule = null;

/**
 * Plain command syntax.
 */
Command.prototype.plain = null;

/**
 * Determines the order of command checking.
 */
Command.prototype.specificity = null;

module.exports = {Command:Command, SPECIFICITY:{FIRST:100, LAST:-100}};