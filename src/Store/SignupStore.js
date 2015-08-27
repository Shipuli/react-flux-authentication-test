import Reflux from 'reflux';
import {signup} from '../Actions/actions';
import {post} from '../Tools/ajax';

var SignupStore = Reflux.createStore({

	init: function() {
		this.listenTo(signup, this.onSignup);
	},

	//ajax for signup
	//if false "user already exists" (or server has problems)
	//if true everything went better than expected
	onSignup: function(user) {
		post('signup', user).then(function(res){
			if(res !== 'false'){
				this.trigger(true);
			}else{
				this.trigger(false);
			}
		}.bind(this));
	}

});

export default SignupStore;