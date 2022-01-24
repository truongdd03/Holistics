/**
 * Code for storing and loading a specific state
 */

import { validateParams, display, displayError, displayOk } from "./utility.js";

var storage = undefined;

function writeToFile(d) {
	const data = JSON.stringify(d);
	localStorage.setItem('snapshot', data);
}

export function save(inputArr , d) {
	if (!validateParams(inputArr, 1, false)) { return; }
	if (storage != undefined) {
		display("WARNING: Overwrote a previous state", "yellow");
	}

	storage = Object.assign({}, d.dict);
	writeToFile(d);
	displayOk("Saved!");
}

export function restore(inputArr, d) {
	if (!validateParams(inputArr, 1, false)) { return; }
	const data = JSON.parse(localStorage.getItem('snapshot'));
	if (data == null) {
		displayError("ERROR: Haven't saved yet");
		return;
	}

	d.dict = Object.assign({}, data.dict);
	d.timeout = {};

	displayOk("Restored!");
}