import { Ledis } from './support/Ledis.js';
import { save, restore } from './support/snapshot.js';
import { displayHelp } from './support/help.js';
import { displayError } from './support/utility.js';

var D = new Ledis({}, {});

// Couldn't find a better way to do this. 
// This map replaces the switch statement and reduces significant amount of code.
const EXECUTE = {
	'set': (arr) => D.set(arr),
	'get': (arr) => D.get(arr),
	'sadd': (arr) => D.sadd(arr),
	'smembers': (arr) => D.smembers(arr),
	'srem': (arr) => D.srem(arr),
	'sinter': (arr) => D.sinter(arr),
	'keys': (arr) => D.keys(arr),
	'del': (arr) => D.del(arr),
	'expire': (arr) => D.expire(arr),
	'ttl': (arr) => D.ttl(arr),
	'help': (arr) => displayHelp(arr),
	'save': (arr, D) => save(arr, D),
	'restore': (arr, D) => restore(arr, D)
}

const CMDS = Object.keys(EXECUTE);
CMDS.sort();

/**
 * Convert the input into an array and execute the command
 */
export function convertToArr(input) {
	var inputArr = input.split(" ").filter(function (val) {
		return val != "";
	});

	try {
		inputArr[0] = inputArr[0].toLowerCase();
		if (EXECUTE[inputArr[0]] === undefined) {
			displayError();
			return;
		}
		// Execute the command
		EXECUTE[inputArr[0]](inputArr, D);
	} catch (error) {
		displayError();
	}
}

/**
 * Suggest a command for user. Used for auto-completing
 */
export function suggest(prefix, viewed) {
	if (prefix === "") return input;

	for (let key of CMDS) {
		if (key.indexOf(prefix) === 0 && viewed[key] === undefined) {
			viewed[key] = true;
			return key;
		}
	}
	viewed = {};
	return "";
}
