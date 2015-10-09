$.ajax({
	
		    type : "GET",
		    url : "http://112.74.102.213/test/formhash.php?username=admin&uid=1",
		    dataType : "jsonp",
		    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		    jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		    success : function(data){
		   // 	alert('success!!');
		    	// alert(data["formhash"]);
		   
		    	 document.getElementById('hash').value=data["formhash"];
		    	// alert(data["formhash"]);
		    },
		    error:function(){
		     alert("error!");
		    }
		});
