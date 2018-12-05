// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
require("../../lib/Array");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var RaceManager = require("../manager/RaceManager");
var Race = require("../Race");
var ClassManager = require("../manager/ClassManager");
var Class = require("../Class");
var CommandHandler = require("../manager/CommandManager");
var Channel = require("../Channel");
var ChannelManager = require("../manager/ChannelManager");
var Template = require("../Template");
var MapManager = require("../manager/MapManager");
var Map = require("../map/Map");

// local
var _templates = [];
var _characters = [];

// generic namespace
class Database{
	static get templates(){
		return _templates;
	}

	static get characters(){
		return _characters;
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
					RaceManager.add(race);
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
					ClassManager.add(_class);
					Logger.info(_("Loaded class '%s'", _class.display));
					if(!--size) callback();
				});
			}
		});
	}

	// loads commands into commandhandler
	static loadCommands(callback){
		Logger.info(_("Loading commands..."));
		fs.readdir("./src/mud/command/", function(err, files){
			for(var file of files){
				var _class = require("../command/"+file);
				var command = new _class();
				if(!command.rule) continue;
				CommandHandler.add(command);
				Logger.info(_("Loaded command '%s'", command.plain));
			}

			CommandHandler.sortCommandsBySpecificity();
			callback();
		})
	}

	static loadChannels(callback){
		Logger.info(_("Loading channels..."));
		fs.readdir("./data/channel", function(err, files){
			for(var file of files){
				var _channel = require("../../../data/channel/"+file);
				var channel = new Channel();
				channel.__fromJSON(_channel);
				ChannelManager.add(channel);
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

	static loadMap(callback){
		Logger.info(_("Loading map..."));
		// no map format, make a generic one
		MapManager.map = new Map({width:100, height:100, levels:10});
		Logger.info(_("Loaded map."));
		callback();
	}

	/**
	 * Load all data into database.
	 * Calls callback at the end.
	 * @param {function} callback 
	 */
	static load(callback){
		Logger.info(_("Loading database..."));

		// specify loaders in the order they should be run
		var loaders = [Database.loadRaces, Database.loadClasses, Database.loadChannels, Database.loadCommands, Database.loadTemplates, Database.loadMap];

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
