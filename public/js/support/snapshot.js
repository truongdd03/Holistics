/**
 * Code for storing and loading a specific state
 */
import { validateParams, display, displayError, displayOk } from "./utility.js";

/**
 * Write a snapshot to the localStorage
 * @param {*} d The snapshot
 */
function writeToFile(d) {
	const data = JSON.stringify(d);
	localStorage.setItem('snapshot', data);
}

/**
 * Process the save command
 * @param {*} inputArr The command split
 * @param {*} d The main dictionary
 */
export function save(inputArr, d) {
	if (!validateParams(inputArr, 1, false)) { return; }

	const data = JSON.parse(localStorage.getItem('snapshot'));
	if (data != null) {
		display("WARNING: Overwrote a previous state", "yellow");
	}

	writeToFile(d);
	displayOk("Saved!");
}

/**
 * Process the restore command
 * @param {*} inputArr The command split
 * @param {*} d The main dictionary
 * @returns 
 */
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