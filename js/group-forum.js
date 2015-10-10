

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
	var ul1 = document.getElementById('ul1');
	for(var i =0;i<length;i++)
	{
		//alert(JSON.stringify(data.forum));

		var fornum = document.createElement("li");
		fornum.className='mui-table-view-cell';
		fornum.innerHTML = '<a class="mui-navigate-right">' + data.group[i].name + '</a>'

		
		for(var j =0;j<data.forum[i].length;j++)
		{ 
			var forumString =JSON.stringify(data.forum[i][j].name);
			var forumid = JSON.stringify(data.fid[i][j].fid);
			//alert(forumid);
			forumid=forumid.substr(1,forumid.length-2);
			var subFornum = document.createElement("li");
			subFornum.className = 'mui-table-view-cell';
			subFornum.innerHTML = "<img src='" + "http://112.74.102.213/data/attachment/common/"+data.img[i][j].icon+"'  height='20' width='30'/>&nbsp;&nbsp;"+ forumString.substr(1,forumString.length-2);
			subFornum.id = forumid;
			
			subFornum.addEventListener('tap', function (){
				var id = this.getAttribute('id');
				var title = this.innerText;
				//alert(title);
				mui.openWindow({
	    		url: 'thread-list.html', 
	    		extras: {
	    			forumid: id,
	    			forumtitle:title
	    		}
  				});
				
			});
			fornum.appendChild(subFornum);
		}
	ul1.appendChild(fornum);
		
	}
	
	//alert(length1);
    },
    error:function(){
        alert('fail');
    }
});

