// node includes
const util = require("util");

// local includes
require("../lib/String");
require("../lib/Array");
const _ = require("../../i18n");
const Logger = require("../util/Logger");
const HelpfileManager = require("./manager/HelpfileManager");
const RaceManager = require("./manager/RaceManager");
const ClassManager = require("./manager/ClassManager");
const MapManager = require("./manager/MapManager");
const CharacterManager = require("./manager/CharacterManager");
const MapObjectFactory = require("./factory/MapObjectFactory");
const Mob = require("./map/Mob");

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
		// text data
		let greeting = HelpfileManager.getHelpfileByKeywords("greeting").content;
		this.player.sendLine(greeting);
		this.askForName();
	}

	askForName(){
		this.player.ask(_("What's your name?"), function(input){
			this.processName(input);
		}.bind(this));
	}

	processName(input){
		let exists = CharacterManager.getCharacterByName(input);
		if(exists) {
			this.oCharacter = exists;
			this.player.sendLine(_("Welcome back!"));
			this.askForExistingPassword();
			return;
		}

		this.name = input;
		this.askForPassword();
	}

	askForExistingPassword(){
		this.player.ask(_("Enter your password:"), function(input){
			this.processExistingPassword(input);
		}.bind(this));
	}

	processExistingPassword(input){
		if(this.oCharacter.password !== input){
			this.oCharacter = null;
			this.player.sendLine("WRONG!");
			this.askForName();
			return;
		}

		this.motd();
	}

	askForPassword(){
		this.player.ask(_("Enter a password:"), function(input){
			this.processPassword(input);
		}.bind(this));
	}

	processPassword(input){
		this.password = input;
		this.askForRace();
	}

	askForRace(){
		let msg = "------------------";
		for(let race of RaceManager.selectable){
			msg += "\r\n" + util.format("%s %s %s %s", "|", race.display.padLeft(14), "|", race.description);
		}

		msg += "\r\n";
		msg += "------------------";
		this.player.sendLine(msg);
		this.player.ask(_("Enter a race:"), function(input){
			this.processRace(input);
		}.bind(this));
	}

	processRace(input){
		let race = RaceManager.selectable.search(input);
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
		for(let _class of ClassManager.selectable){
			msg += "\r\n" + util.format("%s %s %s %s", "|", _class.display.padLeft(14), "|", _class.description);
		}

		msg += "\r\n";
		msg += "------------------";
		this.player.sendLine(msg);
		this.player.ask(_("Enter a class:"), function(input){
			this.processClass(input);
		}.bind(this));
	}

	processClass(input){
		let _class = ClassManager.selectable.search(input);
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
		this.mob.restore();
		this.motd();
	}

	motd(){
		let motd = HelpfileManager.getHelpfileByKeywords("motd").content;
		this.player.sendLine(motd);
		this.player.ask(_("Press enter to continue..."), this.finish.bind(this));
	}

	finish(){
		let worldmap = MapManager.getMapByName("World");
		if(this.oCharacter){ // load old character
			this.mob = MapObjectFactory.loadFromJSON(this.oCharacter.mob); // load old mob
			this.player.mob = this.mob;
			let tile = MapManager.getLocation(this.mob._tmploc);
			if(tile) { // valid location
				this.mob.loc = tile; // move to tile
				delete this.mob._tmploc; // delete tmp member
			} else { // invalid location
				Logger.error("BAD LOC %s ON CHARACTER LOGIN", JSON.stringify(this.loc)); // move to generic tile
				this.loc = worldmap.getTileByXYZ(0,0,0);
			}
		} else {
			// assign our mob
			let tile = worldmap.getTileByXYZ(0,0,0);
			this.player.mob = this.mob;
			this.mob.loc = tile;
			CharacterManager.createCharacter(this.mob, this.password);
			this.player.sendLine(_("Welcome to the game, %s the %s %s!", this.mob.name, this.mob._race.display, this.mob._class.display));
		}

		// show room
		this.mob.showRoom();
	}
}

Nanny.prototype.player = null;
Nanny.prototype.name = null;
Nanny.prototype.password = null;
Nanny.prototype.race = null;
Nanny.prototype.class = null;
Nanny.prototype.mob = null;
Nanny.prototype.oCharacter = null;

module.exports = Nanny;

/**
 * Sole valid argument for `new Nanny()`.
 * @typedef {Object} NannyConstructorOptions
 * @property {Player} player The player to begin baby sitting.
 */
