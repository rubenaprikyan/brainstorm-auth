'use strict';

const Router = require('koa-router');

const UserController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth');

const router = new Router({
    prefix: '/users'
});

router.get('/:id',auth, UserController.actionView);

router.post('/login', UserController.actionLogin);



module.exports = router;
