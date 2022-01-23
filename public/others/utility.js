/**
 * Display the prompt to the window
 */
 function display(prompt, color) {
	var p = document.createElement('p');
	p.textContent = `> ${prompt}`;
	p.className = "output";
	p.style.color = color;
	document.getElementById('window').appendChild(p);
	// Auto scroll to the bottom
	document.getElementById('window').scrollTop = document.getElementById('window').scrollHeight;
}

/**
 * Display the prompt when the number of parameters is invalid
 */
function displayInvalidParams(given, expected) {
	display(`ERROR: wrong number of arguments (given ${given}, expected ${expected})`, "red");
}

/**
 * Display in green color
 */
function displayOk(prompt = "OK") {
	display(prompt, "green");
}

/**
 * Display in red color
 */
function displayError(prompt = "ERROR: Command not found") {
	display(prompt, "red");
}

/**
 * Display the prompt of invalid type
 */
function displayInvalidType(expected) {
	display(`ERROR: Invalid type (Cannot perform this command since the current key is assigned to a ${expected})`, "red");
}

/**
 * Display a warning
 */
function displayWarning(prompt = "WARNING: Some values are not sets") {
	display(prompt, "yellow");
}

/**
 * Check if the inputs is valid for set queries
 */
 function validateSetQuery(inputArr, params, canBeGreater, dict) {
	if ((canBeGreater && inputArr.length < params + 1) || 
		(!canBeGreater && inputArr.length != params)) {
		var paramStr = params - 1;
		if (canBeGreater) {
			paramStr = `>= ${params}`;
		}
		displayInvalidParams(inputArr.length - 1, paramStr);
		return false;
	}

	const key = inputArr[1];
	if (typeof(dict[key]) === 'string') {
		displayInvalidType("string");
		return false;
	}
	return true;
}