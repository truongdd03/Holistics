const CMD = ["set", "get", "sadd", 'srem', 'smembers', 'sinter', 'keys', 'del', 'expire', 'ttl', 'save', 'restore'];

const D = new String({});

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
			disPlayError();
			return;
		}
		process(inputArr);
	} catch (error) {
		disPlayError();
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
	}
}