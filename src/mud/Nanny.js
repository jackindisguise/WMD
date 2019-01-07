// node includes
var util = require("util");
var fs = require("fs");

// local includes
require("../lib/String");
require("../lib/Array");
var _ = require("../../i18n");
var Logger = require("../util/Logger");
var RaceManager = require("./manager/RaceManager");
var ClassManager = require("./manager/ClassManager");
var MapManager = require("./manager/MapManager");
var worldmap = MapManager.getMapByName("World");
var Mob = require("./map/Mob");

// text data
var greeting = fs.readFileSync("./data/reference/greeting.txt", "utf8");
var motd = fs.readFileSync("./data/reference/motd.txt", "utf8");

/**
 * Used for transitioning a client into a proper playable state.
 */
class Nanny{
    /**
     * Construct a Nanny.
     * @param {NannyConstructorOptions} options 
     */
    constructor(options){
        if(options) {
            if(options.player) this.player = options.player;
        }
    }

    login(){
        this.greet();
    }

    greet(){
        this.player.sendLine(greeting);
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
        var msg = "{y------------------";
        for(var race of RaceManager.races){
            msg += util.format("%s%s {Y%s {y%s {x%s{y", "\r\n", "|", race.display.padLeft(14), "|", race.description);
        }

        msg += "\r\n";
        msg += "------------------{x";
        this.player.sendLine(msg);
        this.player.ask(_("Enter a race:"), function(input){
            this.processRace(input);
        }.bind(this));
    }

    processRace(input){
        var race = RaceManager.races.search(input);
        if(!race) {
            this.player.sendLine(_("That isn't a valid race."));
            this.askForRace();
            return;
        }

        this.race = race;
        this.askForClass();
    }

    askForClass(){
        var msg = "{c------------------";
        for(var _class of ClassManager.classes){
            msg += util.format("%s%s {C%s {c%s {x%s{c", "\r\n", "|", _class.display.padLeft(14), "|", _class.description);
        }

        msg += "\r\n";
        msg += "------------------{x";
        this.player.sendLine(msg);
        this.player.ask(_("Enter a class:"), function(input){
            this.processClass(input);
        }.bind(this));
    }

    processClass(input){
        var _class = ClassManager.classes.search(input);
        if(!_class) {
            this.player.sendLine(_("That isn't a valid class."));
            this.askForClass();
            return;
        }

        this.class = _class;
        this.createCharacter();
    }

    createCharacter(){
        this.isNew = true;
        this.mob = new Mob();
        this.mob.name = this.name;
        this.mob.race = this.race;
        this.mob.class = this.class;
        this.mob.restore();
        this.motd();
    }

    motd(){
        this.player.sendLine(motd);
        this.player.ask(_("Press enter to continue..."), this.finish.bind(this));
    }

    finish(){
        // assign our mob
        this.player.mob = this.mob;

        // move to new location
        if(this.isNew){
            this.mob.loc = worldmap.getTileByXYZ(0,0,0);
            this.player.sendLine(_("Welcome to the game, %s the %s %s!", this.mob.name, this.mob._race.display, this.mob._class.display));

        // load old location
        } else {
            var tile = worldmap.map.getTileByXYZ(this.loc.x, this.loc.y, this.loc.z);
            if(tile) this.loc = tile;
            else {
                Logger.error("BAD LOC %s ON CHARACTER LOGIN", JSON.stringify(this.loc));
                this.loc = worldmap.map.getTileByXYZ(0,0,0);
            }
        }

        // show room
        this.mob.showRoom();
    }
}

Nanny.prototype.player = null;
Nanny.prototype.name = null;
Nanny.prototype.mob = null;
Nanny.prototype.race = null;
Nanny.prototype.class = null;
Nanny.prototype.isNew = false;

module.exports = Nanny;

/**
 * Sole valid argument for `new Nanny()`.
 * @typedef {Object} NannyConstructorOptions
 * @property {Player} player The player to begin baby sitting.
 */
