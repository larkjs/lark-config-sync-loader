# lark-config-sync-loader
Sync loader for lark-config.

## Usage

```
const LarkConfig  = require('lark-config');
const load        = require('lark-config-sync-loader');
const config      = new LarkConfig();

load(config, '/path/to/config');    // equivalent to config.load('/path/to/config') in sync way
```
