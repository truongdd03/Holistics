/**
 * The class holds all the information of this program.
 * this.dict is a dictionary. For each pair (key, value), the value's can be a string or a set
 */
class Ledis {
	constructor(dict) {
		this.dict = dict;
	}

	/**
	 * Replace the value of a specific key by a string.
	 */
	set(inputArr) {
		if (inputArr.length != 3) {
			displayInvalidParams(inputArr.length - 1, 2);
			return;
		}
		const key = inputArr[1], val = inputArr[2];
		this.dict[key] = val;
		displayOk();
	}

	/**
	 * Get value of a string.
	 * Throw an error if the value of this key is a set.
	 */
	get(inputArr) {
		if (inputArr.length != 2) {
			displayInvalidParams(inputArr.length - 1, 1);
			return;
		}
		var key = inputArr[1];
		if (typeof this.dict[key] !== "string" && this.dict[key] !== undefined) {
			displayInvalidType("set");
			return;
		}
		display(this.dict[key], "green");
	}

	/**
	 * Assign a set to a key.
	 * Throw error if the current key is assigned to a string.
	 * The new set will replace the old set of this key.
	 */
	sadd(inputArr) {
		if (!validateSetQuery(inputArr, 2, true, this.dict)) {
			return;
		};

		const key = inputArr[1];
		if (this.dict[key] === undefined) {
			this.dict[key] = new Set();
		}

		inputArr.slice(2, inputArr.length).forEach(val => this.dict[key].add(val));
		display(`This key contains ${this.dict[key].size} elements`, "green");
	}

	/**
	 * Get value of a set.
	 * Throw an error if the value of this key is a string.
	 */
	smembers(inputArr) {
		if (!validateSetQuery(inputArr, 2, false, this.dict)) {
			return;
		};

		var key = inputArr[1];
		try {
			const output = Array.from(this.dict[key]).join(', ');
			display(`{${output.toString()}}`, "green");	
		} catch (error) {
			display("undefined", "green");
		}
	}

	/**
	 * Remove some values out of the set
	 * Throw an error if the value of this key is a string
	 */
	srem(inputArr) {
		if (!validateSetQuery(inputArr, 2, true, this.dict)) {
			return;
		}
		const key = inputArr[1];
		if (this.dict[key] === undefined) {
			disPlayError("ERROR: key does not exist");
			return;
		}

		const arr = inputArr.slice(2, inputArr.length);
		this.dict[key].forEach((val) => {
			if (arr.includes(val)) {
				this.dict[key].delete(val);
			}
		});
		displayOk(`${this.dict[key].size} remaining element(s)`);
	}

	sinter(inputArr) {
		if (!validateSetQuery(inputArr, 1, true, this.dict)) {
			return;
		}

		var ans = new Set(), first = true;
		for (let i = 1; i < inputArr.length; ++i) {
			var key = inputArr[i];
			if (!(this.dict[key] instanceof Set)) {
				displayWarning();
				ans.clear();
				first = false;
			} else if (!first) {
				ans = new Set([...ans].filter(val => this.dict[key].has(val)));
			} else {
				ans = new Set(this.dict[key]);
				first = false;
			}
		}

		const output = Array.from(ans).join(', ');
		display(`{${output.toString()}}`, "green");	
	}
}