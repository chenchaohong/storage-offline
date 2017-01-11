var koa          = require('koa'),
	router       = require('./router'),
	dataGetter   =require('./dataGetter'),
	mixed 		 = require('./mixed'),
    log = require('../lib/log').logger,
	app          = koa();




app
//.use(logger())
  .use(router.routes())
  .use(dataGetter)
  .use(mixed)

app.listen(8088);
console.log('listening on port 8088');

log.info('[%s] server started, listening to %s', "d://aa" ,8080);
log.debug("collectTime=%s",123);