import React from 'react';
import Authenticated from './Authenticated';

//Example of "authentication required"-component
export default Authenticated(class Private extends React.Component {
	render() {
		return(
			<h1>Super secrets right here</h1>
			)
	}
});