var koa_router = require('koa-router')(),
	router = {},
	querystring = require('querystring');


koa_router.get('/user', function* (next) {

    var req = this.request,
    	res = this.response,
        querystringObj = querystring.parse(req.querystring);

    //console.log(req)

    yield next;
});

koa_router.get('/test', function* (next) {
    
	this.body='{"test":"test end"}';
	
	console.log(this.body)
});


module.exports = koa_router;