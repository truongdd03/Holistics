/**
 * Display the prompt to the window
 */
 function display(prompt, color) {
	var p = document.createElement('p');
	p.textContent = `> ${prompt}`;
	p.className = "output";
	p.style.color = color;
	document.getElementById('window').appendChild(p);
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
function disPlayError(prompt = "ERROR: Key not found") {
	display(prompt, "red");
}