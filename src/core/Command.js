var Logger = require("../util/Logger");
var Mob = require("../map/Mob");

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

Command.prototype.rule = null;
Command.prototype.plain = null;

/**
 * Determines the order of command checking.
 */
Command.prototype.specificity = null;

module.exports = Command;
