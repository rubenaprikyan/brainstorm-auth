'use strict';

const Router = require('koa-router');

const userRoute = require('./user');


const router = new Router({
    prefix: '/v1'
});

router.use(userRoute.routes());


module.exports = router;