'use strict';

const assert  = require('assert');
const debug   = require('debug')('lark-config-sync-loader');
const fs      = require('fs');
const path    = require('path');
const yaml    = require('js-yaml');
const Config  = require('lark-config');

module.exports = function (config, directory, mode = null) {
    assert(config instanceof Config, 'Invalid type of config, should be an instance of LarkConfig');
    assert(path.isAbsolute(directory), 'Invalid config directory, should be an absolute path');
    assert(fs.statSync(directory).isDirectory(), 'Invalid config directory, should be a DIRECTORY');
    config.use(readdir(directory), mode);
    return config;
};


function readdir(directory) {
    debug(`load ${directory}`);
    const configData = {};
    const files = fs.readdirSync(directory);
    for (const filename of files) {
        const extname = path.extname(filename);
        const name = path.basename(filename, extname);
        assert(!configData.hasOwnProperty(name), `Duplicated config file ${name}`);
        const filePath = path.resolve(directory, filename);
        configData[name] = fs.statSync(filePath).isDirectory() ?
            readdir(filePath) : loadFile(filePath, extname);
    }
    return configData;
}


function loadFile(filePath, extname) {
    extname = extname.toLowerCase();
    if (['.js', '.node', '.json'].includes(extname)) {
        return require(filePath);
    }
    if (['.yml', '.yaml'].includes(extname)) {
        const content = fs.readFileSync(filePath);
        return yaml.safeLoad(content);
    }
    throw new Error(`Can not parse ${extname} file`);
}
