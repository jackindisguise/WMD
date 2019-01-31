class WearSlot{
	constructor(options){
		if(options){
			if(options.type) this.type = options.type;
			if(options.name) this.name = options.name;
		}
	}
}

WearSlot.prototype.type = null;
WearSlot.prototype.name = null;
WearSlot.prototype.worn = null;

module.exports = WearSlot;
