const fs = require("fs");

class Character{
	constructor(options){
		if(options){
			if(options.name) this.name = options.name;
			if(options.password) this.password = options.password;
			if(options.mob) this.mob = options.mob;
		}
	}

	__JSONWrite(variable, value, json){
		switch(variable){
		case "_mob": json.mob = value; break;
		default: super.__JSONWrite(variable, value, json); break;
		}
	}

	__JSONRead(variable, value){
		switch(variable){
		case "mob": this._mob = value; break;
		default: super.__JSONRead(variable, value); break;
		}
	}

	writeToFile(){
		let file = "./data/character/" + this.name + ".json";
		let json = this.__toJSON();
		fs.writeFile(file+"~", JSON.stringify(json, null, "\t"), function(err){
			if(err) return;
			fs.rename(file+"~", file, function(err){
				if(err) return;
				// etc
			});
		});
	}

	deleteFile(){
		let file = "./data/character/" + this.name + ".json";
		fs.stat(file, function(err){
			if(err) return;
			fs.unlink(file, function(err){
				if(err) return;
				// done
			});
		});
	}

	set mob(mob){
		let nJSON = mob.__toJSON();
		let oString = JSON.stringify(this._mob);
		let nString = JSON.stringify(nJSON);
		if(oString === nString) return; // nothing changed. do nothing.
		this._mob = nJSON; // overwrite old JSON
		this.writeToFile(); // update file
	}

	get mob(){
		return this._mob;
	}
}

Character.prototype.name = null;
Character.prototype.password = null;
Character.prototype._mob = null;

module.exports = Character;
