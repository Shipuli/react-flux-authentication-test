import Reflux from 'reflux';
import {transition} from '../Actions/actions';

var router = null;

//Store which has the Router object for transitions
var RouterStore = Reflux.createStore({

	init: function() {
		this.listenTo(transition, this.onTransition)
	},

	set: function(r) {
		router = r;
	},

	onTransition: function(path) {
		router.transitionTo(path);
	}

});

export default RouterStore