import React from 'react';
import {Route, NotFoundRoute, DefaultRoute} from 'react-router';
import App from './Components/App';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Home from './Components/Home';
import NotFound from './Components/404'
import Private from './Components/Private'

var routes = (
	<Route handler={App} path="/">
		<DefaultRoute name="home" handler={Home} />
		<Route name="login" path="login" handler={Login} />
		<Route name="signup" path="signup"handler={Sign} />
		<Route name="private" path="private"handler={Private} />
		<NotFoundRoute handler={NotFound} />
	</Route>
	);

export default routes;