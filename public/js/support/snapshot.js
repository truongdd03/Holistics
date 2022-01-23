/**
 * Code for storing and loading a specific state
 */

import { validateParams, display, displayError, displayOk } from "./utility.js";

var storage = undefined;
export function save(inputArr , d) {
	if (!validateParams(inputArr, 1, false)) { return; }

	if (storage != undefined) {
		display("WARNING: Overwrote a previous state", "yellow");
	}

	storage = Object.assign({}, d.dict);
	displayOk("Saved!");
}

export function restore(inputArr, d) {
	if (!validateParams(inputArr, 1, false)) { return; }

	if (storage == undefined) {
		displayError("ERROR: Haven't saved yet");
		return;
	}

	d.dict = Object.assign({}, storage);
	d.timeout = {};
	displayOk("Restored!");
}