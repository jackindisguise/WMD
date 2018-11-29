// node includes
var util = require("util");

// local includes
require("../lib/String");
require("../lib/Array");
var Database, MUD, Mob;
var _ = require("../../i18n");
var Logger = require("../util/Logger");

/**
 * Used for transitioning a client into a proper playable state.
 */
class Nanny{
    /**
     * Construct a Nanny.
     * @param {NannyConstructorOptions} options 
     */
    constructor(options){
        this.player = options.player;
    }

    login(){
        this.greet();
    }

    greet(){
        this.player.sendLine(Database.greeting);
        this.askForName();
    }

    askForName(){
        this.player.ask(_("What's your name?"), function(input){
            this.processName(input);
        }.bind(this));
    }

    processName(input){
        this.name = input;
        this.askForRace();
    }

    askForRace(){
        var msg = _("------------------");
        for(var race of Database.races){
            msg += util.format("%s%s %s %s %s", "\r\n", "|", race.display.padLeft(14), "|", race.description);
        }

        msg += "\r\n";
        msg += _("------------------");
        this.player.sendLine(msg);
        this.player.ask(_("Enter a race:"), function(input){
            this.processRace(input);
        }.bind(this));
    }

    processRace(input){
        var race = Database.races.search(input);
        if(!race) {
            this.player.sendLine(_("That isn't a valid race."));
            this.askForRace();
            return;
        }

        this.race = race;
        this.askForClass();
    }

    askForClass(){
        var msg = _("------------------");
        for(var _class of Database.classes){
            msg += util.format(_("%s%s %s %s %s"), "\r\n", "|", _class.display.padLeft(14), "|", _class.description);
        }

        msg += "\r\n";
        msg += _("------------------");
        this.player.sendLine(msg);
        this.player.ask(_("Enter a class:"), function(input){
            this.processClass(input);
        }.bind(this));
    }

    processClass(input){
        var _class = Database.classes.search(input);
        if(!_class) {
            this.player.sendLine(_("That isn't a valid class."));
            this.askForClass();
            return;
        }

        this.class = _class;
        this.createCharacter();
    }

    createCharacter(){
        this.mob = new Mob();
        this.mob.name = this.name;
        this.mob.race = this.race;
        this.mob.class = this.class;
        this.motd();
    }

    motd(){
        this.player.sendLine(Database.motd);
        this.player.ask(_("Press enter to continue..."), this.finish.bind(this));
    }

    finish(){
        this.player.mob = this.mob;
        this.player.sendLine(_("Welcome to the game, %s the %s %s!", this.mob.name, this.mob.race.name, this.mob.class.name));
    }
}

Nanny.prototype.player = null;
Nanny.prototype.name = null;
Nanny.prototype.mob = null;
Nanny.prototype.race = null;
Nanny.prototype.class = null;

module.exports = Nanny;

/**
 * Sole valid argument for `new Nanny()`.
 * @typedef {Object} NannyConstructorOptions
 * @property {Player} player The player to begin baby sitting.
 */

// cyclical include
Database = require("./Database");
MUD = require("./MUD");
Mob = require("../map/Mob");