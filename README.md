# Holistics

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
