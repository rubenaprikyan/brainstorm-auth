'use strict';

const _isEmpty = require('lodash/isEmpty');
const BSA = require('./lib/brainstormedauth');
const { User } = require('../data/models');
const config = require('../config');

const bsa = BSA();

const secret = config.get('bstoken:secret');

bsa.use(secret, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (_isEmpty(user) || user.accessTokenSalt !== payload.salt) {
            return done(null, null);
        }
        
        // you can check user status or any things ....

        done(null, user);
    } catch (e) {
        done(e, null);
}
});

module.exports = bsa.authenticate();