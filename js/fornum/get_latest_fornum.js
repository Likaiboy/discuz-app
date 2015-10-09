var itemid = 'item1';

function selectedItem(_itemid) {
	alert(_itemid);
	itemid = _itemid;
	$.ajax({
		type: "GET",
		url: "http://112.74.102.213/examples/code/get_latest_fornum.php",
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		success: function(data) {
			var str = JSON.stringify(data);
			var res = eval("(" + str.substr(1, str.length - 2) + ")");
			alert(res[0]["subject"]);

			var latest_fornum = document.getElementById("latest_fornum_list");
			var li = document.createElement("li");
			li.className = "mui-table-view-cell mui-media";
			li.innerHTML = '<a href="#" <div class="mui-media-body">' +
				res[0]["subject"] +
				'<p class="mui-ellipsis"> <span class="mui-ellipsis-2">' +
				res[0]["message"]; +
			'</span></p></div></a>';
			li.addEventListener('tap', function() {
				var id = this.getAttribute('id');
				mui.openWindow({
					url: 'list.html',
					styles: {
						top: 10px,
						bottom: 10px, //新页面底部位置
					},
					extras: {
						forumid: id
					}
				});

			});
			latest_fornum.insertBefore(li, latest_fornum.firstChild);

		},
		error: function() {
			alert('fail');
		}
	});
}