let _WM = new WeakMap();
let nextID = 0;

class ObjectManager{
	static identify(obj){
		if(!_WM.has(obj)) _WM.set(obj, nextID++);
		return _WM.get(obj);
	}
}

module.exports = ObjectManager;
