class MapObject{
	constructor(options){
		this._loc = null;
		this._contents = [];

		if(options){
			if(options.loc != null) this.loc = options.loc;
		}
	}

	get contents(){
		return this._contents;
	}

	get loc(){
		return this._loc;
	}

	// recursive reference between a map object's loc and the loc's contents.
	// if mapobject A is in mapobject B's contents, mapobject A's loc must be mapobject B.
	set loc(loc){
		// do nothing, already here
		if(this._loc == loc) return;

		// preserve old loc
		var oloc;
		if(this._loc){
			oloc = this._loc;
			this._loc = null; // set to null first
		}

		// remove us from oloc's contents
		if(oloc) oloc.remove(this); // cyclical dereference

		// set to new loc
		if(loc && loc instanceof MapObject){
			this._loc = loc;
			loc.add(this); // cyclical reference
		}
	}

	// check if an object can enter us
	canEnter(enterer){
		return true;
	}

	// check if an object can exit us
	canExit(exiter){
		return true;
	}

	// check if we can move to a new location
	canMove(loc){
		if(this.loc && !this.loc.canExit(this)) return;
		if(!loc.canEnter(this)) return;
		return true;
	}

	// empty move function for later :)
	move(loc){
	}

	/**
	 * Add an object to our contents.
	 */
	add(mapobject){
		if(this._contents.indexOf(mapobject) >= 0) return; // already in contents
		this._contents.push(mapobject);
		if(mapobject.loc != this) mapobject.loc = this; // cyclical reference
	}

	/**
	 * Remove an object from our contents.
	 */
	remove(mapobject){
		var pos = this._contents.indexOf(mapobject);
		if(pos == -1) return; // not in contents
		this._contents.splice(pos, 1);
		if(mapobject.loc == this) mapobject.loc = null; // cyclical dereference
	}
}

module.exports = MapObject;
