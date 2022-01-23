# Holistics

The main idea behind the implementation is to use two dictionaries (one for timeout and one for key-value) to store the data. The program splits each command into one different case to process easier. The utility functions (public/others/utility.js) are used in multiple cases, reducing the amount of code.

## Notes

- This program can ignore lowercase/uppercase letters and spaces in commands. That said, it can understand invalid commands such as "SeT Hello World". However, lowercase/uppercase letters in keys/values are treated differently ("Hello" is different from "hello").
- The set timeout command (EXPIRE) will delete the selected key after a specific amount of time. Note that there is no way to cancel this action. Even if the user deletes that key, the key will be deleted one more time if there is still a timeout.
- The show timeout command (TTL) will display the remaining time that the key will be removed, not the origin timeout.

## Set up

- You need to have node.js and npm installed before being able to run this program.
- After cloning the project and directing to its directory, run ``` $node app.js ```. The program should then be available at http://localhost:3000/.

## Features

### Requirements

#### String

- [x] SET key value: set a string value, always overwriting what is saved under key
- [x] GET key: get a string value at key

#### Set

- [x] SADD key value1 [value2...]: add values to set stored at key
- [x] SREM key value1 [value2...]: remove values from set
- [x] SMEMBERS key: return array of all members of set

#### Data Expiration

- [x] KEYS: List all available keys
- [x] DEL key: delete a key
- [x] EXPIRE key seconds: set a timeout on a key, seconds is a positive integer (by default a key has no expiration). Return the number of seconds if the timeout is set
- [x] TTL key: query the timeout of a key

#### Error Handling

- [x] Detect errors

### Optional:

- [x] Display detailed informations about errors

- [x] SINTER [key1] [key2] [key3] ...: (bonus) set intersection among all set stored in specified keys. Return array of members of the result set

- [ ] SAVE: save current state in a snapshot

- [ ] RESTORE: restore from the last snapshot
