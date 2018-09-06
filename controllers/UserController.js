'use strict';

const _isEmpty = require('lodash/isEmpty');
const _trim = require('lodash/trim');
const { User }  = require('../data/models/');
const Helper = require('../components/Helper');

class UserHandler {

    static async actionView(ctx){
        let {id} = ctx.params;

        if(id === 'me'){
            return ctx.ok({me:ctx.state.user})
        }
        
        const user = await User.findById(id);

        if (_isEmpty(user)){
            return ctx.notFound('user does not exist')
        }
        return ctx.ok({user});
    }

    static async actionLogin(ctx) {
        let { email, password } = ctx.request.body;
        email = _trim(email);
        password  = Helper.cleanPassword(password);

        const user = await User.findOne({
            where:{
                email
            }
        });

        if (_isEmpty(user)){
            return ctx.notFound('userName  not correct');
        }

        if (!(await user.checkPassword(password, user.password))){
            return ctx.notFound('password  not correct');
        }

        return ctx.ok({
            user,
            token: user.generateToken()
        });
    }

}

module.exports = UserHandler;