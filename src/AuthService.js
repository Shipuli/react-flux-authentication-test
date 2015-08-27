import {post, get} from './Tools/ajax';
import {autoLogin} from './Actions/actions';

var user = {
	nick: '',
	autoLogin: false,
	isLoggedIn: false
};

export default class Auth {

	//ajax-post -> here -> LoginStore
	static login(data) {
		return post('/login', data).then(function(res){
			if(res !== 'false'){
				user.nick = res;
				user.isLoggedIn = true;
				autoLogin(user.nick, user.isLoggedIn);
				return true
			}else{
				return false
			}
		});
	}

	//called when user enters the site
	//here -> autoLogin(action) -> autoLoginStore -> component
	static autoLogin() {
		user.autoLogin = true;
		return get('/auto').then(function(res) {
			if(res !== 'false'){
				user.nick = res;
				user.isLoggedIn = true;
				autoLogin(user.nick, user.isLoggedIn);
				return true
			}else{
				return false
			}
		});
	}

	static logout() {
		user.nick = "";
		user.isLoggedIn = false;
		get('/logout')
		autoLogin("", false); //using autoLogin action to inform components 
	}

	//Mostly used by authenticated component
	static isLoggedIn() {
		if(!user.isLoggedIn && !user.autoLogin){
			return this.autoLogin();
		}else{
			return new Promise(function(resolve,reject){
				resolve(user.isLoggedIn);
			});
		}
	}
}
