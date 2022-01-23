/**
 * The class holds all the information of this program.
 * this.dict is a dictionary. For each pair (key, value), the value can be a string or a set
 * this.timeout is a dictionary storing the timeout and the time at when the user set the timeout for each key.
 */
class Ledis {
	constructor() {
		this.dict = {};
		this.timeout = {};
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
			displayError("ERROR: key does not exist");
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

	/**
	 * Return the intersect of list of keys
	 */
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

	/**
	 * Return all the keys
	 */
	keys(inputArr) {
		if (inputArr.length > 1) {
			displayInvalidParams(inputArr.length - 1, 0);
			return;
		}
		const output = Array.from(Object.keys(this.dict)).join(', ');
		displayOk(`[${output}]`);
	}

	/**
	 * Delete a key
	 */
	del(inputArr) {
		if (inputArr.length != 2) {
			displayInvalidParams(inputArr.length-1, 1);
			return;
		}
		delete(this.dict[inputArr[1]]);
		displayOk();
	}

	/**
	 * Set a timeout on a key
	 */
	expire(inputArr) {
		if (inputArr.length - 1 != 2) {
			displayInvalidParams(inputArr.length-1, 2);
			return;
		}
		if (this.timeout[inputArr[1]] !== undefined) {
			displayError("ERROR: Failed to set timeout. This key is currently having a timeout");
			return;
		}
		try {
			var key = inputArr[1], sec = parseInt(inputArr[2]) * 1000;
			this.timeout[key] = [sec, new Date()];
			setTimeout(() => {
				delete this.dict[key];
				display(`The key ${key} has been deleted due to timeout`, "purple");
			}, sec);
			displayOk();
		} catch (error) {
			displayError("ERRORS: Invalid time or key");
		}
	}

	/**
	 * Return the timeout of a key
	 */
	ttl(inputArr) {
		if (inputArr.length - 1 != 1) {
			displayInvalidParams(inputArr.length - 1, 1);
			return;
		}
		const key = inputArr[1];
		if (this.timeout === undefined) {
			displayOk("undefined");
			return;
		}

		const originTimeout = this.timeout[key][0], timeSet = this.timeout[key][1];
		const currentDate = new Date();

		// The current timeout = (the origin timeout) - (duration from the moment setting the timeout to now)
		const time = originTimeout - (currentDate.getTime() - timeSet.getTime());
		displayOk(`The key ${key} will be deleted after ${time/1000} seconds`);
	}
}