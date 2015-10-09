setTimeout(
function getContent(){
var tid = document.getElementById('tid').value;
//alert("hahah");
//alert(tid);

		$.ajax({
		    type : "GET",
		    url : "http://112.74.102.213/test/post-content.php?tid=" + tid,
		    //url : "http://112.74.102.213/php_test/post-content.php?tid=" + tid,
		    dataType : "jsonp",
		    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		    jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		    success : function(data){
		    	
		    	var div = document.getElementById("div");
		    	var t = document.getElementById("title");
				t.innerText = data.forum[0];
				var liOthers = document.createElement("li");
				liOthers.className = "mui-table-view-cell list";
			    var ulOthers = document.createElement("ul");
			    ulOthers.className = "mui-table-view";
			    ulOthers.appendChild(liOthers);
			    div.appendChild(ulOthers);
				liOthers.innerHTML= '<h4>'
			    				+ data.subject
			    				+ '</h4><div class="status"><div class="view"><h5><span class="iconfont icon-view"><span class="mui-tab-label">'
			    				+ data["views"]//views
			    				+ '</span></span></h5></div><div class="reply"><h5><span class="iconfont icon-pinglun"><span class="mui-tab-label">'
			    				+ data["replies"]//replies
			    				+ '</span></span></h5></div><div class="date"><h5>'
			    				+ data.date
			    				+ '</h5></div></div>';
				for(var i = 0; i < data.message.length; i++){
		    		
		    		var liConent = document.createElement("li");
			    	liConent.className = "mui-table-view-cell";
			    	var ulConent = document.createElement("ul");
			    	ulConent.className = "mui-table-view";
			    	var divContent = document.createElement("div");
			    	divContent.className = "mui-content-padded";
			    	ulConent.appendChild(liConent);
			    	divContent.appendChild(ulConent);
			    	div.appendChild(divContent);
			    	//li.innerText = data.subject ;
			    	var str = data.message[i];
			    	//alert(str);
			    	//str = str.replace(/\[url=forum.php?mod=redirect&amp;goto=findpost&amp;pid=72&amp;ptid=37\]\[img\]static\/image\/common\/back.gif\[\/img\]\[\/url\]/ig,"");
			    	str = str.replace(/\[img\]static\/image\/common\/back.gif\[\/img\]/ig,'') ;
			    	str = str.replace(/</ig,'&lt;');
					str = str.replace(/>/ig,'&gt;');
					str = str.replace(/\n/ig,'<br />');
					str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpcode($2);});
					str = str.replace(/\[hr\]/ig,'<hr />');
					str = str.replace(/\[\/(size|color|font|backcolor)\]/ig,'</font>');
					str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'<$1>');
					str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'</$1>');
					str = str.replace(/\[\/align\]/ig,'</p>');
					str = str.replace(/\[(\/)?h([1-6])\]/ig,'<$1h$2>');
					str = str.replace(/\[align=(left|center|right|justify)\]/ig,'<p align="$1">');
					str = str.replace(/\[size=(\d+?)\]/ig,'<font size="$1">');
					str = str.replace(/\[size=[1-9]\d*px\]/ig,'<font size="$1">');
					str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
					str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
					str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
					str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig,'<ol type="$1">$2</ol>');
					str = str.replace(/\[(\/)?list\]/ig,'<$1ul>');
					str = str.replace(/\[s:(\d+)\]/ig,function($1,$2){ return smilepath($2);});
					str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig,'<p style="text-align:center;"><img src="$1" width="300" border="0" /></p>');
					str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$2'+'</a>');
					str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$1'+'</a>');
					//add
					
					//str = str.replace(/\[quote\]([^\[]+)\[\/quote\]/ig, '<p">'+'"$1".replace(/\[img\]([^\[]*)\[\/img\]/ig,"")'+'</p>');
					//str = str.replace(/\[quote\]([^\[]+)\[\/quote\]/ig, '<p">'+'sdf'+'</p>');
					//str = str.replace(/\[quote\]([^\[]+)\[img\]([^\[]+)\[\/img\]([^\[]+)\[\/quote\]/ig, '[quote]$1$3[/quote]');
					//str = str.replace(/\[quote\]([^\[]+)\[\/quote\]/ig, '');
					//str = str.replace(/\[quote\]([^\[]*)\[\/quote\]/ig, '<p>'+'$1'+'</p>');
					//str = str.replace(/\[quote\]([^\[]*)\[\/quote\]/ig, '<p style="background:#DDDDDD">'+'$1'+'</p>');
					str = str.replace(/\[quote\]/ig,'<p style="background:#DDDDDD">');
					str = str.replace(/\[\/quote\]/ig,'</p>');
					str = str.replace(/\[p=null, 2, left\]/ig, '<div class="indent">');
					str = str.replace(/\[p=[0-9]\d*, 2, left\]/ig, '<div class="indent">');
					str = str.replace(/\[p=[0-9]\d*, null, center\]/ig, '<div class="indent">');
					str = str.replace(/\[p=[0-9]\d*, null, left\]/ig, '<div class="indent">');
					str = str.replace(/\[size=[0-9]\d*px\]/ig,'<font size="$1">');
					str = str.replace(/\[\/p\]/ig, '</div>');
					str = str.replace(/\[table=[0-9]\d*%\]/ig, '');
					str = str.replace(/\[tr\]/ig, '');
					str = str.replace(/\[td\]/ig, '');
					str = str.replace(/\[table=[0-9]\d*%\]/ig, '');
					str = str.replace(/\[\/tr\]/ig, '');
					str = str.replace(/\[\/td\]/ig, '');
					str = str.replace(/\[\/table\]/ig, '');
					str = str.replace(/\[img=[0-9]\d*,[0-9]\d*\]([^\[]*)\[\/img\]/ig,'<p style="text-align:center;"><img src="$1" width="300" border="0" /></p>');
			    	str = str.replace(/\[url=([^\[]*)\](.*)\[\/url\]/ig,'<a href="$1">$2</a> ');
			    	str = str.replace(/\[float=(.*)\]/ig,'');
			    	str = str.replace(/\[\/float\]/ig,'');
			    	//li.innerText = up(data.message);    	
			    	//ulOthers.appendChild(liOthers);
					
					var louhao =  i + 1 + '楼';
					if(i == 0)
						louhao = '楼主';
					if(i == data.message.length - 1){
						liConent.style.marginBottom="12px";
					}
					liConent.innerHTML= '<table><div class="index">'
					+ louhao
					+ '</div><div class="status"><div class="author-image" ><img height="35px" width="35px" src="'
					+ 'http://112.74.102.213' + data.img[i]//img src
					+ '"/></div><div class="author">'
					+ data.author[i]
					+ '</div><div class="level">'
					+ data.rank[i]
					+ '</div></div><br><div class="content">'
					+ str
					+ '</div></br></table>';
			    	}
		    	
		    	
		    	
		    },
		    fail:function(){
		    
		    }
		    
		 });
		

},2000);