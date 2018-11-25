Object.prototype.__JSONWrite = function(key, value, json){
    if(this.constructor.prototype[key] == value) return; // don't save default values
    if(typeof value === "function") return; // don't save functions
    if(typeof value === "object") return; // ignore objects
    json[key] = value;
}

Object.prototype.__toJSON = function(){
    var json = {};
    for(var variable in this){
        this.__JSONWrite(variable, this[variable], json);
    }

    return json;
};

Object.prototype.__JSONRead = function(key, value){
    this[key] = value;
};

Object.prototype.__fromJSON = function(json){
    for(var variable in json){
        this.__JSONRead(variable, json[variable]);
    }
};