import { Ledis } from './support/Ledis.js';
import { save, restore } from './support/snapshot.js';
import { displayHelp } from './support/help.js';
import { Interface } from 'readline';

const CMD = ["set", "get", "sadd", 'srem', 'smembers', 'sinter', 'keys', 'del', 'expire', 'ttl', 'save', 'restore', 'help'];
var D = new Ledis({}, {});

/**
 * Convert the input into an array
 */
export function convertToArr(input) {
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
		case "save":
			save(inputArr, D);
			break;
		case "restore":
			restore(inputArr, D);
			break;
	}
}
