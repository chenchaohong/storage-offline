
var path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    request = require('request'),
    //extend = require('extend'),
    backendHost = "",
    TIME_OUT = 3000;

var filename = path.basename(__filename);

// 透传浏览器请求，重新获取新的后台数据
var dataGetter = function* (next) {
    var req = this.request,
        res = this.response,
        app = this.app;

    if(typeof req.nodata !== 'undefined' && req.nodata === true) {

        req.userData = querystring.parse(req.querystring);

    } else {

        var responseData = yield requestBackend(req, this),
            userData = {};
            
        try {
            userData = JSON.parse(responseData.body);

        } catch(e) {

            console.log("catch")
        }
        //console.log(responseData)

        req.userData = userData;
        req.backendResponse = responseData.response;

        // 经过确认,只有statusCode = 608 && userData.code = 6302 的时候,需要throw 608 error
        if(responseData.response.statusCode === 608 && userData && +userData.code === 6302) {
            this.throw(608, 'backend return 608');
            return;
        }
    }

    yield next;
};


function requestBackend(userRequest, ctx) {

    var app = ctx.app;
    
    return new Promise(function(resolve, reject) {

        //var requestedUrl = backendHost + userRequest.url;
        var requestedUrl = "http://222.178.68.122:19090/wechatBank_sit/common/rsaEncode";

        request({
            url: requestedUrl,
            //contentType: 'text/html;charset=utf-8',
            // 透传header
            // headers: extend(userRequest.header, { referer: userRequest.href,  memberCode: ctx.cookies.get('memberCode'), token: ctx.cookies.get('u_login_token') }),
            headers: userRequest.header,
            timeout: TIME_OUT
        }, function(err, response, body) {
        	response.setEncoding('utf8');
            if(err) {
                reject(err);
                return;
            }

            if(response.statusCode === 200) {
                resolve({
                    body: body,
                    response: response
                });

            } else {
                // 自定义的statusCode
                if(response.statusCode === 608) {

                    console.log("response.statusCode:"+response.statusCode)
                    resolve({
                        body: body,
                        response: response
                    });

                } else {

                    log.error('[%s] request error, statusCode is %d, url is %s, body is ', filename, response.statusCode, requestedUrl, body);
                    var backendError = new Error(body);
                    backendError.status = response.statusCode;
                    reject(backendError);
                }

            }
        });
    });
}


module.exports = dataGetter;

