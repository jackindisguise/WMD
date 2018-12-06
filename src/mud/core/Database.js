// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
require("../../lib/Array");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var CharacterManager = require("../manager/CharacterManager");
var Mob = require("../map/Mob");
var RaceManager = require("../manager/RaceManager");
var Race = require("../Race");
var ClassManager = require("../manager/ClassManager");
var Class = require("../Class");
var CommandHandler = require("../manager/CommandManager");
var Channel = require("../Channel");
var ChannelManager = require("../manager/ChannelManager");
var MapManager = require("../manager/MapManager");
var Map = require("../map/Map");
var ObjectFactory = require("../factory/ObjectFactory");
var TemplateManager = require("../manager/TemplateManager");
var Template = require("../Template");

// generic namespace
class Database{
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
					Logger.info(_("Loaded race '%s'", race.name));
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
					Logger.info(_("Loaded class '%s'", _class.name));
					if(!--size) callback();
				});
			}
		});
	}

	static loadCharacters(callback){
		// no character loading ATM
		callback();
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
		});
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

	static preloadTemplates(callback){
		Logger.info(_("Preloading templates..."));
		fs.readdir("./data/template", function(err, files){
			for(var file of files){
				var _template = require("../../../data/template/"+file);
				var template = new Template();
				if(_template.obj.contents) template._contents = _template.obj.contents;
				template.__fromJSON(_template);
				TemplateManager.add(template);
				if(template._contents) Logger.info(_("Loaded half of template for <%s> '%s'", _template.type, template.obj.name));
				else Logger.info(_("Loaded full template for <%s> '%s'", _template.type, template.obj.name));
			}

			callback();
		});
	}

	static loadTemplates(callback){
		Logger.info(_("Finish templates..."));
		for(var template of TemplateManager.templates){
			var contents = template._contents;
			if(!contents) continue;
			for(var json of contents){
				var obj = ObjectFactory.loadFromJSON(json);
				if(obj) obj.loc = template.obj;
			}

			delete template._contents;
			Logger.info(_("Finished loading template for <%s> '%s'", template.obj.constructor.name, template.obj.name));
		}

		callback();
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
		var loaders = [Database.loadRaces, Database.loadClasses, Database.preloadTemplates, Database.loadTemplates, Database.loadChannels, Database.loadCommands, Database.loadMap, Database.loadCharacters];

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
