// const String = require('./classes/String');

const ERR = "> ERROR: Key not found";
const CMD = ["set", "get", "sadd", 'srem', 'smembers', 'sinter', 'keys', 'del', 'expire', 'ttl', 'save', 'restore'];
// const D = String({});
/**
 * Get input when users type enter
 */
function receiveInput() {
	var input = document.getElementById('input').value;
	// Display the command
	display(`> ${input}`, "grey");
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
		console.log(inputArr[0]);
		if (!CMD.includes(inputArr[0])) {
			display(ERR, "red");
			return;
		}
	} catch (error) {
		display(ERR, "red");
	}
}

/**
 * Process the command
 */
function process(inputArr) {
	switch (inputArr[0]) {
		case "set":

	}
}

/**
 * Display the prompt to the window
 */
function display(prompt, color) {
	var p = document.createElement('p');
	p.textContent = prompt;
	p.className = "output";
	p.style.color = color;
	document.getElementById('window').appendChild(p);
}