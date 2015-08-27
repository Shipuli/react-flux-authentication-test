//Why use libraries when you can make your own.


//Return: Promise with response from server
export var post = function(url, payload) {
	return new Promise(function(resolve, reject){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.onload = function(e) {
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					resolve(xhr.responseText);
				}else{
					reject("error")
				}
			}
		}
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(payload));
	})
};

//Return: Promise with response from server
export var get = function(url) {
	return new Promise(function(resolve, reject){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onload = function(e) {
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					 resolve(xhr.responseText);
				}else{
					reject("error")
				}
			}
		}
		xhr.send();
	})
};