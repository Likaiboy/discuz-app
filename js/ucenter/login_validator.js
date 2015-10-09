function validator() {
	var name = document.getElementById("username").value;
	var psw = document.getElementById("password").value;

	$.ajax({
		type: "GET",
		url: "http://112.74.102.213/examples/code/login.php?username=" + name + "&password=" + psw,
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		success: function(data) {

			var str = JSON.stringify(data);
			var loginRes = eval("(" + str + ")");

			if (loginRes["Status"] == true) {
				localStorage["username"] = name;
				localStorage["loginTime"] = new Date().getTime();
				location.href = "index.html";
			} else
				alert("账户名或者密码错误");
			//alert(myobj["Status"]);
			//alert(myobj[0]"Status");
		},
		error: function() {
			alert('fail');
		}
	});

}