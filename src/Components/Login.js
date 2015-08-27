import React from 'react';
import {loginAttempt} from '../Actions/actions';
import loginStore from '../Store/LoginStore';
import Auth from '../AuthService';

export default class LogIn extends React.Component {

	static willTransitionTo(transition, params, query, callback) {
			Auth.isLoggedIn().then(function(res){
				if(res){
					transition.redirect('/');
					callback();
				}else{
					callback();
				}
			})
	}

	constructor() {
		super();
		this.state = {
			"name": "",
			"pass": ""
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.componentWillUnMount = this.componentWillUnMount.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.onFailure = this.onFailure.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = loginStore.listen(this.onFailure);
	}

	componentWillUnMount() {
		this.unsubscribe();
	}

	onFailure(status) {
		var o = {help: status};
		this.setState(o);
	}

	handleSubmit(e) {
		e.preventDefault();
		var user = {
			"name":this.state.name,
			"pass":this.state.pass
		};
		loginAttempt(user); //flux action
	}

	//text field handling
	onChange(e) {
		e.preventDefault();
		var key = e.target.name
		var s = {}; //making possible to use variable as key
		s[key] = e.target.value
		this.setState(s);
	}

	render() {
		return(
		<div>
			<h1 className="form-header">Log In</h1>
			<form onSubmit={this.handleSubmit}>
				<fieldset className="form-group">
					<label htmlFor="form-name">Name</label>
					<input type="text" className="form-control" name="name" id="form-name" placeholder="Username" value={this.state.name} onChange={this.onChange}/>
				</fieldset>
				<fieldset className="form-group">
					<label htmlFor="form-pass">Password</label>
					<input type="password" className="form-control" name="pass" id="form-pass" placeholder="Password" value={this.state.pass} onChange={this.onChange}/>
				</fieldset>
				<input className="btn btn-primary-outline"type="submit" />
				<p className='text-muted help'>{this.state.help}</p>
			</form>
		</div>
		)
	}
}
