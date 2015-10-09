function logincheck(){
	if(localStorage["username"] == "null"){
		mui.openWindow({	
			url: "login.html"
		});
	}
	if(new Date().getTime() - localStorage["loginTime"] > 3600 * 48){
		localStorage["username"] = null;
		localStorage["loginTime"] = null;
		mui.openWindow({	
		url: "login.html"
	});
	}
	localStorage["loginTime"] = new Date().getTime();	
	
}
