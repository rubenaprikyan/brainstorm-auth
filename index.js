'use strict';

const kaBody = require('koa-body');
const respond = require('koa-respond');
const Koa = require('koa');
const app = new Koa();

const config = require('./config');

/**
 * ############## MIDDLEWARES ##############
 */
app.use(kaBody());
app.use(respond())

/**
 * ############## ROUTES ##############
 */
 const v1Routes = require('./routes/v1');

 app.use(v1Routes.routes());
 app.use(v1Routes.allowedMethods());

/**
 * ############## SERVER CONFIGURATION ##############
 */
let port =  config.get('server:port');

const server = require('http').createServer(app.callback());

server.listen(port, () => {
    console.info(`Server is running on port : ${port}`);
});
