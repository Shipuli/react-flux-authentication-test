import React from 'react';
import Router from 'react-router';
import routes from './routes';
import RouterStore from './Store/RouterStore';

import Style from '!style!css!sass!./Style/main.scss';

var router = Router.create({
	routes: routes,
	location: Router.HistoryLocation
});

RouterStore.set(router);

router.run((Handler) => {
	React.render(<Handler />, document.getElementById('app'));
});