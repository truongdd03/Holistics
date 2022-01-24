/**
 * Code for displaying the help menu
 */
import { displayOk, displayError } from "./utility.js";

const HELP = {
	"set": "SET key value: set a string value, always overwriting what is saved under key",
	"get": "GET key: get a string value at key",
	"sadd": "SADD key value1 [value2...]: add values to set stored at key",
	"srem": "SREM key value1 [value2...]: remove values from set",
	"smembers": "SMEMBERS key: return array of all members of set",
	"sinter": "SINTER [key1] [key2] [key3] ...: set intersection among all set stored in specified keys. Return array of members of the result set",
	"keys": "KEYS: List all available keys",
	"del": "DEL key: delete a key",
	"expire": "EXPIRE key seconds: set a timeout on a key, seconds is a positive integer (by default a key has no expiration). Return the number of seconds if the timeout is set",
	"ttl": "TTL key: query the timeout of a key",
	"save": "SAVE: save current state in a snapshot",
	"restore": "RESTORE: restore from the last snapshot"
};

/**
 * Display the help menu
 * @param {*} inputArr The command split
 */
export function displayHelp(inputArr) {
	if (inputArr.length == 1) {
		// Show the whole menu
		for (let key in HELP) {
			displayOk(HELP[key], "grey");
		}
	} else if (inputArr.length == 2) {
		// Show a specific command's description
		const key = inputArr[1];
		if (!Array.from(Object.keys(HELP)).includes(key)) {
			displayError("ERROR: Invalid command");
		} else {
			displayOk(HELP[key]);
		}
	} else {
		displayError("ERROR: Please just type HELP or HELP + COMMAND");
	}
}