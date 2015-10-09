

$.ajax({
    type : "POST",
    url : "http://112.74.102.213/test/group-forum.php",
    dataType : "jsonp",
    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
    jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
    success : function(data){ 
//	var dataString = ;
	var groupString = JSON.stringify(data.group[0].name);
	//alert(groupString);
	
	var length = data.group.length;
	//alert(length);
	
	var length1 = data.forum[2].length;
	//alert(length1);
	var form1 = document.getElementById('form1');
	for(var i =0;i<length;i++)
	{
		//alert(JSON.stringify(data.forum));

		var fornum = document.createElement("div");
		fornum.innerHTML = '<div class="mui-input-row" style="font-size:16px"><label>' + data.group[i].name + '</label></div>';
	   

		
		for(var j =0;j<data.forum[i].length;j++)
		{ 
			var forumString =JSON.stringify(data.forum[i][j].name);
			var forumid = JSON.stringify(data.fid[i][j].fid);
			//alert(forumid);
			forumid=forumid.substr(1,forumid.length-2);
			var subFornum = document.createElement("div");
			subFornum.className = 'mui-input-row mui-radio mui-left';
			subFornum.innerHTML = '<label>' + forumString.substr(1,forumString.length-2) + 
			'</label><input name="radio" type="radio">';
			subFornum.id = forumid;
			
			subFornum.addEventListener('tap', function (){
				var id = this.getAttribute('id');
				var title = this.innerText;
				
				window.location.href='new-post.html?fid=' + forumid +'&name=' + forumString.substr(1,forumString.length-2);
				mui.back();
			});
			fornum.appendChild(subFornum);
		}
	form1.appendChild(fornum);
		
	}
	
	//alert(length1);
    },
    error:function(){
        alert('fail');
    }
});



