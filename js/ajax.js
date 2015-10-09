setTimeout(
	function(){
		var div = document.getElementById("fornum_list");
		var fid = div.value;		
		var list = document.getElementById("fornum");
		var t = document.getElementById("title");
		$.ajax({
	
		    type : "GET",
		    url : "http://112.74.102.213/test/post_list.php?fid=" + fid,
		    dataType : "jsonp",
		    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		    jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		    success : function(data){
			for(var i=data.subject.length-1 ; i>=0 ; i--){  

				var newLi = document.createElement('li');
				newLi.className = "mui-table-view-cell list  mui-media";
				newLi.id = data["tid"][i];
				var str = null;
				if(GetImg(data["message"][i]) != "null")
				str = '<img class="mui-media-object mui-pull-right" src="'
				+ GetImg(data["message"][i]) 
				+'">'; 
				else str = "";
				newLi.innerHTML =
				str
				+ '<div class="mui-media-body">'
				+ data["subject"][i]
				+ '<p class="mui-ellipsis-2">' 
				+ GetContent(data["message"][i]) 
				+ '</p></div><div class="status"><div class="date"><h5>'
				+ data["date"][i]
				+ '</h5></div><div class="author"><h5>'
				+ data["author"][i]
				+ '</h5></div><div class="view"><h5><span class="iconfont icon-view"><span class="mui-tab-label">' 
				+ data["views"][i]
				+ '</span></span></h5></div><div class="reply"><h5><span class="iconfont icon-pinglun"><span class="mui-tab-label">'
				+ data["replies"][i]
				+'</span></span></h5></div></div>';
				
				newLi.addEventListener('tap', function (){
					var id = this.getAttribute('id');
					
					mui.openWindow({
	    					url: 'post-content.html', 
	    					extras: {
	    						postid: id,
	    						forumid: document.getElementById("fornum_list").value
	    					}
  					});
				
				});
			   list.appendChild(newLi);
			}
			
			  
		    },
		    error:function(){
		     
		    }
			})
		}
		,1000);