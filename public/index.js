import { convertToArr, suggest } from './js/script.js';
import { display } from './js/support/utility.js';

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

/**
 * Auto-complete mechanism
 */
var prefix = undefined, viewed = {};
document.getElementById('input').addEventListener('keydown', function (e) {
	if (e.key === 'Tab') {
		e.preventDefault();
		// Case empty input
		if (prefix === undefined) {
			prefix = this.value;
		}

		// viewed is a dictionary storing the previous suggestions
		var suggestion = suggest(prefix, viewed);
		// don't change the input if there is no suitable suggestion
		if (suggestion != "") {
			this.value = suggestion;
		}
	} else {
		// when the user type something different than tab, reset the viewed dict and prefix
		prefix = undefined;
		viewed = {};
	}
});
