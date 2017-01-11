/**
 * Created by patrickliu on 15/6/24.
 */
var path = require('path');

var filename = path.basename(__filename);

var mixed = function* (next) {
    var request = this.request,
        response = this.response,
        app = this.app;

    var userData = request.userData;

    console.log(userData)

    this.body = userData;
    this.set({
        'Content-Type': 'text/html;charset=UTF-8'
    });

    yield next;
};

module.exports = mixed;
