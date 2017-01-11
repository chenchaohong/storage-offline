;(function($){
	
	$(document).on('click','#idxbutton1',function(){
        alert("demo 按钮");
    });
    
    //需启动 src\http\nodeStart.bat
	$(document).on('click','#testnodeJs',function(){
        $.ajax({
			type: 'get',
			url: 'http://127.0.0.1:8088/user',
//			url: 'http://127.0.0.1:8088/test',
			data: {
				a: 123,
				b: 222
			},
			success: function(data) {
				console.log($.parseJSON(data))
			},
			error: function(error) {
				//console.log(error)
			}
		});
    });

}(Zepto))
