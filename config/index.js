'use strict';
const path = require('path');
const config = require('nconf');

const defaults = {
    NODE_ENV: 'development'
};

config.argv().env();
let mode = config.get('NODE_ENV') || defaults.NODE_ENV;
config.file({ file: path.join(__dirname, mode, 'main.json')});

config.set('params', {
    ...require(path.join(__dirname, mode, 'params'))
});

config.defaults(defaults);

module.exports = config;