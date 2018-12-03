// local includes
var MessageCategory = require("./MessageCategory");

// stuff
class Communicate{
    /**
     * Express an action to those around a mob.
     * ***TODO*** add documentation for legal fields
     * @param {Mob} actor
     * @param {ActFormat} format
     * @param {Mob[]} targets
     * @param {Object} fields
     * @param {function} filter
     * @param {MessageCategory} category
     */
    static act(actor, format, targets, fields, filter, category=MessageCategory.ACTION){
        if(targets.indexOf(actor) == -1) targets.push(actor);
        for(var target of targets){
            // target filtered out
            if(filter && !filter(actor, fields, target)) continue;

            // process string
            var processed;
            if(target == actor) processed = Communicate.actFieldCodeReplace(format.firstPerson, actor, fields);
            else processed = Communicate.actFieldCodeReplace(format.thirdPerson, actor, fields);

            // send message
            target.sendMessage(processed, category);
        }
    }

    /**
     * Replace act field codes with field values.
     * @param {string} string
     * @param {Mob} actor
     * @param {Object} fields 
     */
    static actFieldCodeReplace(string, actor, fields){
        return string.replace(/\$(.)/g, function(full, code){
            switch(code){
                case "n": return actor.name;
                case "N": return fields.directObject ? fields.directObject.name : "(unknown)";
                case "m": return fields.message ? fields.message : "(unknown)";
                default:
                    Logger.error(_("Bad act code: $%s", code));
                    return "???";
            }
        });
    }

    /**
     * Filters out all but the actor and the directObject.
     * @param {Mob} actor 
     * @param {Mob} target 
     * @param {Object} fields
     */
    static filterActorVictimOnly(actor, target, fields){
        return target == actor ? true : target == fields.directObject ? true : false;
    }
}

module.exports = Communicate;
