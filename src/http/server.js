var http = require('http');
var express = require('express');
var app = express();
var querystring = require('querystring');
var request = require('request');

app.use(express.static('public'));

//app.get('/process_get', function* (next) {
// var req = this.request;
// var code=postCode();
// console.log(code.body);
// 
// yield next;
//})

app.get('/process_get', function* (next) {

    var req = this.request,
        querystringObj = querystring.parse(req.querystring);

    // if ?nodata=1 is passed, we set this to req.data = true
    if(querystringObj && querystringObj['nodata'] == 1) {

        req.nodata = true;
    }

    yield next;
});

var server = app.listen(8088, function () {
  var host = server.address().address
  var port = server.address().port
})

function postCode() {
	return new Promise(function(resolve, reject) {
		request({
			url: "http://blog.csdn.net/Gavin_new/svc/GetCategoryArticleList?id=6298741&type=foot"
	        // 透传header
	        // headers: extend(userRequest.header, { referer: userRequest.href,  memberCode: ctx.cookies.get('memberCode'), token: ctx.cookies.get('u_login_token') }),
	//      headers: userRequest.header,
	//      timeout: TIME_OUT
	    }, function(err, response, body) {
	        if(response.statusCode === 200) {
	        	console.log(body)
                resolve({
                    body: body,
                    response: response
                });
            }
	    })
	})
	
	
	
//var post_options = {
//    host: 'www.baidu.com',
//    path: '/',
//    method: 'GET',
//};
//var post_req = http.request(post_options, function(res) {
//	console.log(909090)
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        console.log('Response: ' + chunk);
//    });
//});

  //post_req.write(post_data);
//post_req.end();

}

//
//
//
////以下打印测试
//
//console.time("获取数据");//输出时间，计算一段代码执行的时间
//setTimeout(function(){
//	//正在执行的脚本的文件名 输出文件所在位置的绝对路径
//	console.log( __filename );
//	//当前执行脚本所在的目录
//	console.log( __dirname );
//}, 2000);
//console.timeEnd("获取数据");
//
//console.log(process.platform+" "+process.arch);
//
//// 获取执行路局
//console.log("获取执行路径:"+process.execPath);
//
//// 输出内存使用情况
//console.log("输出内存使用情况:");
//console.log(process.memoryUsage());