var fs = require('fs');

fs.readFile('test.json',function(err, data){

	console.log(err);

	console.log(data.toJSON());
})
