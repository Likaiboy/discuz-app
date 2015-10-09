function logout(){
	localStorage["username"] = null;
	localStorage["loginTime"] = null;
	mui.openWindow({	
		url: "login.html"
	});
	
}
