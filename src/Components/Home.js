import React from 'react';
import {Link} from 'react-router';
import Auth from '../AuthService';
import AutoLoginStore from '../Store/AutoLoginStore';

export default class Home extends React.Component {

	constructor() {
		super();
		var o = {nick: "", status: false};
		this.state = o;
		this.componentWillUnMount = this.componentWillUnMount.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.onAutoLogin = this.onAutoLogin.bind(this);
		Auth.autoLogin();
	}

	componentDidMount() {
		this.unsubscribe = AutoLoginStore.listen(this.onAutoLogin);
	}

	componentWillUnMount() {
		this.unsubscribe();
	}

	onAutoLogin(nick, state) {
		var o = {nick: nick, status: state};
		this.setState(o);
	}

	render() {
		if(this.state.status){
			return(
			<div className="home-menu">
				<h1>Welcome Home {this.state.nick}</h1>
				<Link to="private">The private stuff you asked for</Link>
			</div>
			)
		}else{
			return(
			<h1>Welcome to this test site sir.</h1>
			)
		}
	}
};
