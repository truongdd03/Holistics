import { convertToArr } from './js/script.js';

/**
 * Get input when users type enter
 */
document.getElementById('input').onchange = function () {
	var input = document.getElementById('input').value;
	// Display the command
	display(`${input}`, "grey");
	// Reset input field
	document.getElementById('input').value = "";
	convertToArr(input);
}
