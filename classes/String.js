class String {
	constructor(dict) {
		this.dict = dict;
	}

	set(key, val) {
		this.dict[key] = val;
	}

	get(key) {
		return this.dict[key];
	}
}