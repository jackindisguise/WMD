// local includes
var Mob, Player;
var MessageCategory = require("./MessageCategory");

// stuff
class Act{
    /**
     * Express an action to those around a mob.
     * ***TODO*** add documentation for legal fields
     * @param {Mob} actor
     * @param {ActFormat} format
     * @param {Mob[]} targets
     * @param {Object} fields
     * @param {function} filter
     */
    static act(actor, format, targets, fields, filter){
        if(targets.indexOf(this) == -1) targets.push(actor);
        for(var target of targets){
            if(filter && actor instanceof Mob && target instanceof Mob && !filter(actor, fields, target)) continue; // target filtered out

            // process string
            var processed;
            if(target == actor) processed = Act.fieldCodeReplace(format.firstPerson, actor, fields);
            else processed = Act.fieldCodeReplace(format.thirdPerson, actor, fields);

            // send message
            target.sendMessage(processed, MessageCategory.ACTION);
        }
    }

    /**
     * Replace field codes with field values.
     * @param {string} string
     * @param {Mob} actor
     * @param {Object} fields 
     */
    static fieldCodeReplace(string, actor, fields){
        return string.replace(/\$(.)/g, function(full, code){
            switch(code){
                case "n": return String(actor);
                case "N": return fields.victim ? String(fields.victim) : "(unknown)";
                case "m": return fields.message ? fields.message : "(unknown)";
                default:
                    Logger.error(_("Bad act code: $%s", code));
                    return "???";
            }
        });
    }

    /**
     * Filters out all but mobs in the same room.
     * @param {Mob} actor 
     * @param {Mob} target 
     * @param {Object} fields
     */
    static filterSameRoom(actor, target, fields){
        return actor.loc == target.loc;
    }

    /**
     * Filters out all but the actor and the victim.
     * @param {Mob} actor 
     * @param {Mob} target 
     * @param {Object} fields
     */
    static filterActorVictimOnly(actor, target, fields){
        return target == actor ? true : target == fields.victim ? true : false;
    }
}

module.exports = Act;

// cyclical includes
Player = require("./core/Player");
Mob = require("../map/Mob");
