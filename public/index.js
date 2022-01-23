const CMD = ["set", "get", "sadd", 'srem', 'smembers', 'sinter', 'keys', 'del', 'expire', 'ttl', 'save', 'restore', 'help'];

const D = new Ledis();

/**
 * Get input when users type enter
 */
function receiveInput() {
	var input = document.getElementById('input').value;
	// Display the command
	display(`${input}`, "grey");
	// Reset input field
	document.getElementById('input').value = "";
	convertToArr(input);
}

/**
 * Convert the input into an array
 */
function convertToArr(input) {
	var inputArr = input.split(" ").filter(function (val) {
		return val != "";
	});

	try {
		inputArr[0] = inputArr[0].toLowerCase();
		if (!CMD.includes(inputArr[0])) {
			displayError();
			return;
		}
		process(inputArr);
	} catch (error) {
		displayError();
	}
}

/**
 * Process the command
 */
function process(inputArr) {
	switch (inputArr[0]) {
		case "set":
			D.set(inputArr);
			break;
		case "get":
			D.get(inputArr);
			break;
		case "sadd":
			D.sadd(inputArr);
			break;
		case "smembers":
			D.smembers(inputArr);
			break;
		case "srem":
			D.srem(inputArr);
			break;
		case "sinter":
			D.sinter(inputArr);
			break;
		case "keys":
			D.keys(inputArr);
			break;
		case "del":
			D.del(inputArr);
			break;
		case "expire":
			D.expire(inputArr);
			break;
		case "ttl":
			D.ttl(inputArr);
			break;
		case "help":
			displayHelp(inputArr);
			break;
	}
}