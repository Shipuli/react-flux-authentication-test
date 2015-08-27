import Reflux from 'reflux';
import {loginAttempt,transition} from '../Actions/actions';
import {post, get} from '../Tools/ajax';
import Auth from '../AuthService';

//Store which handles the login form
var loginStore = Reflux.createStore({
	init: function() {
		this.listenTo(loginAttempt, this.onLoginAttempt);
	},

	onLoginAttempt: function(payload) {
		//Ajax-post -> Auth-login -> here
		Auth.login(payload).then(function(res){
			if(res){
				transition('/');
			}else{
				this.trigger('Wrong username or password');
			}
		}.bind(this));
	}
});

export default loginStore;