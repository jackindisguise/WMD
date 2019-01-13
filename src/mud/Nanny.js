// node includes
const util = require("util");
const fs = require("fs");

// local includes
require("../lib/String");
require("../lib/Array");
const _ = require("../../i18n");
const Logger = require("../util/Logger");
const RaceManager = require("./manager/RaceManager");
const ClassManager = require("./manager/ClassManager");
const MapManager = require("./manager/MapManager");
const Mob = require("./map/Mob");

// text data
const greeting = fs.readFileSync("./data/reference/greeting.txt", "utf8");
const motd = fs.readFileSync("./data/reference/motd.txt", "utf8");

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
		let msg = "------------------";
		for(let race of RaceManager.races){
			msg += util.format("%s%s %s %s %s", "\r\n", "|", race.display.padLeft(14), "|", race.description);
		}

		msg += "\r\n";
		msg += "------------------";
		this.player.sendLine(msg);
		this.player.ask(_("Enter a race:"), function(input){
			this.processRace(input);
		}.bind(this));
	}

	processRace(input){
		let race = RaceManager.races.search(input);
		if(!race) {
			this.player.sendLine(_("That isn't a valid race."));
			this.askForRace();
			return;
		}

		this.race = race;
		this.askForClass();
	}

	askForClass(){
		let msg = "------------------";
		for(let _class of ClassManager.classes){
			msg += util.format("%s%s %s %s %s", "\r\n", "|", _class.display.padLeft(14), "|", _class.description);
		}

		msg += "\r\n";
		msg += "------------------";
		this.player.sendLine(msg);
		this.player.ask(_("Enter a class:"), function(input){
			this.processClass(input);
		}.bind(this));
	}

	processClass(input){
		let _class = ClassManager.classes.search(input);
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
		let worldmap = MapManager.getMapByName("World");
		if(this.isNew){
			let worldmap = MapManager.getMapByName("World");
			this.mob.loc = worldmap.getTileByXYZ(0,0,0);
			this.player.sendLine(_("Welcome to the game, %s the %s %s!", this.mob.name, this.mob._race.display, this.mob._class.display));

			// load old location
		} else {
			let tile = worldmap.map.getTileByXYZ(this.loc.x, this.loc.y, this.loc.z);
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
