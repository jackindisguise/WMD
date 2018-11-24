// node includes
var fs = require("fs");

// local includes
require("../lib/Object");
var Classification = require("./Classification");
var Logger = require("../util/Logger");
var _ = require("../../i18n");

// local
var _races = [];
var _classes = [];

// generic namespace
class Database{
    static get races(){
        return _races;
    }

    static get classes(){
        return _classes;
    }

    // load races
    static loadRaces(callback){
        Logger.verbose(_("Loading races..."));
        fs.readdir("./data/race", function(err, files){
            var size = files.length;
            for(var file of files){
                fs.readFile("./data/race/"+file, "utf8", function(err, data){
                    var json = JSON.parse(data);
                    var race = new Classification();
                    race.__fromJSON(json);
                    _races.push(race);
                    Logger.verbose(_("Loaded race '%s'", race.display));
                    if(!--size) callback();
                });
            }
        });
    }

    // load classes
    static loadClasses(callback){
        Logger.verbose(_("Loading classes..."));
        fs.readdir("./data/class", function(err, files){
            var size = files.length;
            for(var file of files){
                fs.readFile("./data/class/"+file, "utf8", function(err, data){
                    var json = JSON.parse(data);
                    var _class = new Classification();
                    _class.__fromJSON(json);
                    _classes.push(_class);
                    Logger.verbose(_("Loaded class '%s'", _class.display));
                    if(!--size) callback();
                });
            }
        });
    }

    // load entire database
    static load(callback){
        var loaders = [Database.loadRaces, Database.loadClasses];
        Logger.verbose(_("Loading database..."));
        var i = 0;
        function _load(){
            if(i==loaders.length) {
                Logger.verbose(_("Database loaded."));
                callback();
                return;
            }

            loaders[i++](_load);
        }

        _load();
    };
}

module.exports = Database;
