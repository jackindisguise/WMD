// local includes
require("../../lib/Object");
require("../../lib/Array");
var RaceLoader = require("../loader/RaceLoader");
var ClassLoader = require("../loader/ClassLoader");
var ChannelLoader = require("../loader/ChannelLoader");
var CharacterLoader = require("../loader/CharacterLoader");
var CommandLoader = require("../loader/CommandLoader");
var TemplateLoader = require("../loader/TemplateLoader");
var ModelLoader = require("../loader/ModelLoader");
var MapLoader = require("../loader/MapLoader");

// full database loader
module.exports = function(callback){

	// specify loaders in the order they should be run
	var loaders = [RaceLoader, ClassLoader, TemplateLoader, ModelLoader, ChannelLoader, MapLoader, CharacterLoader, CommandLoader];

	// create a "loader iterator" that propagates callbacks
	function loadNext(){
		if(!loaders.length){
			callback();
			return;
		}

		var next = loaders.shift();
		next(loadNext); // call each loader with the iterator
	}

	// start iterator
	loadNext();
};
