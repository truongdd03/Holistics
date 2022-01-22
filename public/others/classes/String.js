class String {
	constructor(dict) {
		this.dict = dict;
	}

	set(inputArr) {
		if (inputArr.length != 3) {
			displayInvalidParams(inputArr.length - 1, 2);
			return;
		}
		const key = inputArr[1], val = inputArr[2];
		this.dict[key] = val;
		displayOk();
	}

	get(inputArr) {
		if (inputArr.length != 2) {
			displayInvalidParams(inputArr.length - 1, 1);
			return;
		}
		display(this.dict[inputArr[1]], "green");
	}
}