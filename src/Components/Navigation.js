import React from 'react';
import {Link} from 'react-router';
import Router from 'react-router';
import Auth from '../AuthService';
import AutoLoginStore from '../Store/AutoLoginStore';
import reactMixin from 'react-mixin';
import {transition} from '../Actions/actions';

export default class Navigation extends React.Component {
	constructor() {
		super();
		let o = {nick: "", status: false};
		this.state = o;
		this.componentWillUnMount = this.componentWillUnMount.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.onAutoLogin = this.onAutoLogin.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = AutoLoginStore.listen(this.onAutoLogin);
	}

	componentWillUnMount() {
		this.unsubscribe();
	}

	onAutoLogin(nick, state) {
		let o = {nick: nick, status: state};
		this.setState(o);
	}

	logout(e) {
		e.preventDefault();
		Auth.logout();
		transition('/');
	}

	render() {
		if(this.state.status){
			return(
				<nav className="col-md-6 col-sm-8 navbar navbar-light">
					<ul className="nav navbar-nav">
						<li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
					</ul>
					<ul className="nav navbar-nav pull-right">
						<li className="nav-item"><a className="nav-link" onClick={this.logout}>Log Out</a></li>
					</ul>
				</nav>
			)
		}else{
			return(
				<nav className="col-md-6  col-sm-8 navbar navbar-light">
					<ul className="nav navbar-nav">
						<li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
					</ul>
					<ul className="nav navbar-nav pull-right">
						<li className="nav-item"><Link to="login" className="nav-link">Log In</Link></li>
						<li className="nav-item"><Link to="signup" className="nav-link">Sign Up</Link></li>
					</ul>
				</nav>
			)
		}
	}
}
