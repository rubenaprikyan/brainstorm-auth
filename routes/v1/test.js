"use strict";

const Router = requrie('koa-router');

const router = new Router({
    prefix: "/test"
});

router.get('/',async (ctx)=>{
  return  ctx.ok('hello')
})

module.exports = router;