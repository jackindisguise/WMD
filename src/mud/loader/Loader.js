// local includes
require("../../lib/Object");
require("../../lib/Array");
const RaceLoader = require("../loader/RaceLoader");
const ClassLoader = require("../loader/ClassLoader");
const AbilityLoader = require("../loader/AbilityLoader");
const CommandLoader = require("../loader/CommandLoader");
const TemplateLoader = require("../loader/TemplateLoader");
const HelpfileLoader = require("../loader/HelpfileLoader");
const CharacterLoader = require("../loader/CharacterLoader");
const ChannelLoader = require("../loader/ChannelLoader");
const ModelLoader = require("../loader/ModelLoader");
const MapLoader = require("../loader/MapLoader");

// full database loader
module.exports = function(callback){
	// specify loaders in the order they should be run
	let loaders = [HelpfileLoader, AbilityLoader, RaceLoader, ClassLoader, TemplateLoader, ModelLoader, ChannelLoader, MapLoader, CharacterLoader, CommandLoader];

	// create a "loader iterator" that propagates callbacks
	function loadNext(){
		if(!loaders.length){
			callback();
			return;
		}

		let next = loaders.shift();
		next(loadNext); // call each loader with the iterator
	}

	// start iterator
	loadNext();
};
