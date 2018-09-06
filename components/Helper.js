'use strict';

const bcrypt = require('bcrypt');
const _trim = require('lodash/trim');
const randomString = require('randomstring');

class Helper {

    static  generatePasshowrdHash(password,option = 10){
        return bcrypt.hash(password,option)
    }

    static cleanPassword(password) {
        return _trim(password).replace(/ /g, '');
    }

    static generateRandomString(options = 32) {
        return  randomString.generate(options);
    }

}
module.exports = Helper;