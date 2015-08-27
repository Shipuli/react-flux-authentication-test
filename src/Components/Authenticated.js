//This component is based on auth0 tutorial example https://auth0.com/blog/2015/04/09/adding-authentication-to-your-react-flux-app/
import React from 'react';
import Auth from '../AuthService';

//Function which makes component require authentication
export default (Component) => {
	return class Authenticated extends React.Component {
		//called before transition (async)
		static willTransitionTo(transition, params, query, callback) {
			Auth.isLoggedIn().then(function(res) {
				if(res) {
					callback();
				}else {
					transition.redirect('/login');
					callback();
				}
			});
		}

		constructor() {
			super();
		}

		render() {
			return(
				<Component />
				)
		}
	}
}