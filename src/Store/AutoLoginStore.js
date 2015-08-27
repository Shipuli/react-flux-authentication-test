import Reflux from 'reflux';
import {autoLogin} from '../Actions/actions';
import Auth from '../AuthService';

var user = {
	nick: "",
	logged: false
}

var autoLoginStore = Reflux.createStore({
	init: function() {
		this.listenTo(autoLogin, this.onAutoLogin);
	},

	onAutoLogin: function(nick, status) {
		user.nick = nick;
		user.logged = status;
		this.trigger(nick, status);
	}
});

export default autoLoginStore;