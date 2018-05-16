'use strict';

const Config  = require('lark-config');
const load    = require('lark-config-sync-loader');
const path    = require('path');

describe('common use', () => {

    it('should be ok loading json in sync way', async () => {
        const config = new Config();
        load(config, path.resolve(__dirname, 'config'));
        config.get('a.key').should.be.exactly('value');
        config.get('b.c.C').should.be.exactly('D');
    });

});
