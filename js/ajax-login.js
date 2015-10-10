var _openw = null;
			if (localStorage["username"] !== "null") {
				mui.openWindow({
					url: "index.html",
				});
			}
			document.getElementById("confirm").addEventListener('tap', function() {
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
							localStorage["uid"] = loginRes["uid"];
							localStorage["formhash"] = loginRes["formhash"];
							localStorage["loginTime"] = new Date().getTime();
							mui.openWindow({
								url: "index.html"
							});
						} else
							alert("账户名或者密码错误");
						
					},
					error: function() {}
				});
			});
			document.getElementById("escape").addEventListener('tap', function() {
				mui.openWindow({
					url: "index.html"
				});
			});
			 //首页返回键处理
			 //处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			mui.back = function() {
				if (!first) {
					first = new Date().getTime();
					mui.toast('再按一次退出应用');
					setTimeout(function() {
						first = null;
					}, 1000);
				} else {
					if (new Date().getTime() - first < 1000) {
						plus.runtime.quit();
					}
				}
			};