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
    constructor(options){
        this.player = options.player;
        this.name = null;
        this.mob = null;
        this.race = null;
        this.class = null;
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
        var msg = _("----- Race -----");
        for(var race of Database.races){
            msg += _("\r\n %s  %s", race.display.center(14), race.description);
        }

        msg += _("\r\n----------------");
        this.player.sendLine(msg);
        this.player.ask("Enter a race:", function(input){
            this.processRace(input);
        }.bind(this));
    }

    processRace(input){
        var race = Database.races.search(input);
        if(!race) {
            this.player.sendLine("That isn't a valid race.");
            this.askForRace();
            return;
        }

        this.race = race;
        this.askForClass();
    }

    askForClass(){
        var msg = _("---- Class -----");
        for(var _class of Database.classes){
            msg += _("\r\n %s  %s", _class.display.center(14), _class.description);
        }

        msg += _("\r\n----------------");
        this.player.sendLine(msg);
        this.player.ask("Enter a class:", function(input){
            this.processClass(input);
        }.bind(this));
    }

    processClass(input){
        var _class = Database.classes.search(input);
        if(!_class) {
            this.player.sendLine("That isn't a valid class.");
            this.askForClass();
            return;
        }

        this.class = _class;
        this.createCharacter();
    }

    createCharacter(){
        this.mob = new Mob();
        this.mob.name = this.name;
        this.motd();
    }

    motd(){
        this.player.ask(_("Press enter to continue..."), this.finish.bind(this));
    }

    finish(){
        this.player.mob = this.mob;
        this.player.sendLine(_("Welcome to the game, %s!", this.mob.name));
    }
}

module.exports = Nanny;

// cyclical include
Database = require("./Database");
MUD = require("./MUD");
Mob = require("../map/Mob");