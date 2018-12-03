// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
require("../../lib/Array");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var Race, Class, Channel, Template;

// local
var _greeting = fs.readFileSync("./data/greeting.txt", "utf8");
var _motd = fs.readFileSync("./data/motd.txt", "utf8");
var _races = [];
var _classes = [];
var _commands = [];
var _channels = [];
var _templates = [];
var _characters = [];

// generic namespace
class Database{
	static get greeting(){
		return _greeting;
	}

	static get motd(){
		return _motd;
	}

	static get races(){
		return _races;
	}

	static get classes(){
		return _classes;
	}

	static get channels(){
		return _channels;
	}

	static get templates(){
		return _templates;
	}

	static get characters(){
		return _characters;
	}

	/**
	 * Get race by ID;
	 * @param {number} id 
	 */
	static getRaceByID(id){
		for(var race of _races){
			if(race.id === id) return race;
		}
	}

	/**
	 * Get race by display name.
	 * @param {string} name 
	 */
	static getRaceByName(name){
		for(var race of _races){
			if(race.display === name) return race;
		}
	}

	/**
	 * Get class by ID;
	 * @param {number} id 
	 */
	static getClassByID(id){
		for(var _class of _classes){
			if(_class.id === id) return _class;
		}
	}

	/**
	 * Get class by display name.
	 * @param {string} name 
	 */
	static getClassByName(name){
		for(var _class of _classes){
			if(_class.display === name) return _class;
		}
	}

	/**
	 * Load all the races into the database.
	 * Calls callback at the end.
	 * @param {function} callback 
	 */
	static loadRaces(callback){
		Logger.info(_("Loading races..."));
		fs.readdir("./data/race", function(err, files){
			var size = files.length;
			for(var file of files){
				fs.readFile("./data/race/"+file, "utf8", function(err, data){
					var json = JSON.parse(data);
					var race = new Race();
					race.__fromJSON(json);
					_races.push(race);
					Logger.info(_("Loaded race '%s'", race.display));
					if(!--size) callback();
				});
			}
		});
	}

	/**
	 * Load all the classes into the database.
	 * Calls callback at the end.
	 * @param {function} callback 
	 */
	static loadClasses(callback){
		Logger.info(_("Loading classes..."));
		fs.readdir("./data/class", function(err, files){
			var size = files.length;
			for(var file of files){
				fs.readFile("./data/class/"+file, "utf8", function(err, data){
					var json = JSON.parse(data);
					var _class = new Class();
					_class.__fromJSON(json);
					_classes.push(_class);
					Logger.info(_("Loaded class '%s'", _class.display));
					if(!--size) callback();
				});
			}
		});
	}

	static processCommand(mob, input){
		for(var command of _commands){
			if(command.match(mob, input)) {
				command.run(mob, input);
				return true;
			}
		}

		return false;
	}

	static sortCommandsBySpecificity(){
		_commands.sort(function(a,b){
			return b.specificity - a.specificity;
		});
	}

	static loadCommands(callback){
		Logger.info(_("Loading commands..."));
		fs.readdir("./src/mud/command/", function(err, files){
			for(var file of files){
				var _class = require("../command/"+file);
				var command = new _class();
				if(!command.rule) continue;
				_commands.push(command);
				Logger.info(_("Loaded command '%s'", command.plain));
			}

			Database.sortCommandsBySpecificity();
			callback();
		})
	}

	static getChannelByKeywords(keywords){
		return Array.search(keywords);
	}

	static getChannelByID(id){
		for(var channel of _channels){
			if(channel.id === id) return channel;
		}
	}

	static loadChannels(callback){
		Logger.info(_("Loading channels..."));
		fs.readdir("./data/channel", function(err, files){
			for(var file of files){
				var _channel = require("../../../data/channel/"+file);
				var channel = new Channel();
				channel.__fromJSON(_channel);
				_channels.push(channel);
				Logger.info(_("Loaded channel '%s'", channel.name));
			}

			callback();
		});
	}

	static getTemplateByID(id){
		for(var template of _templates){
			if(template.id === id) return template;
		}
	}

	static loadTemplates(callback){
		Logger.info(_("Loading templates..."));
		fs.readdir("./data/template", function(err, files){
			for(var file of files){
				var _template = require("../../../data/template/"+file);
				var template = new Template();
				template.__fromJSON(_template);
				_templates.push(template);
				Logger.info(_("Loaded template for <%s> '%s'", _template.type, template.obj.name));
			}

			callback();
		});
	}

	/**
	 * Load all data into database.
	 * Calls callback at the end.
	 * @param {function} callback 
	 */
	static load(callback){
		Logger.info(_("Loading database..."));

		// specify loaders in the order they should be run
		var loaders = [Database.loadRaces, Database.loadClasses, Database.loadChannels, Database.loadCommands, Database.loadTemplates];

		// create a "loader iterator" that propagates callbacks
		var i = 0;
		function loadNext(){
			if(!loaders.length){
				Logger.info(_("Database loaded."));
				callback();
				return;
			}

			var next = loaders.shift();
			next(loadNext); // call each loader with the master loader
		}

		// start iterator
		loadNext();
	};
}

module.exports = Database;

// cyclical includes
Race = require("../Race");
Class = require("../Class");
Channel = require("../Channel");
Template = require("../Template");
