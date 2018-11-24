Object.prototype.__JSONWrite = function(key, value){
    if(this.constructor.prototype[key] == value) return undefined; // don't save default values
    if(typeof value === "Function") return undefined;
    return value;
};

Object.prototype.__toJSON = function(){
    var json = {};
    for(var key in this){
        var value = this.__JSONWrite(key, this[key])
        if(value !== undefined) json[key] = value;
    }

    return json;
};

Object.prototype.__JSONRead = function(key, value){
    return value;
};

Object.prototype.__fromJSON = function(json){
    for(var key in json){
        var value = this.__JSONRead(key, json[key])
        if(value !== undefined) this[key] = value;
    }
};