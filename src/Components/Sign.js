import React from 'react';
import Auth from '../AuthService';
import SignupStore from '../Store/SignupStore';
import {signup} from '../Actions/actions';
import {Link} from 'react-router';

export default class SignUp extends React.Component {
	//called before transition is complete (async action)
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
		//init state
		this.state = {
			name: "",
			pass: "",
			signed: false
		};
		//All the necessary bindings because es6
		this.componentWillUnMount = this.componentWillUnMount.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.onSignup = this.onSignup.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = SignupStore.listen(this.onSignup);
	}

	componentWillUnMount() {
		this.unsubscribe();
	}

	//is signup successful
	onSignup(status) {
		if(status){
			var o = {signed: true}
			this.setState(o)
		}else{
			var o = {help: "Username is already in use"}
			this.setState(o)
		}
	}
	//pretty self-explanatory
	handleSubmit(e) {
		e.preventDefault();
		var user = {
			"name":this.state.name,
			"pass":this.state.pass
		};
		signup(user);
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
		if(this.state.signed){
			return(
			<div>
				<h1>Sign up was successful</h1>
				<Link to="login">Please login</Link>
			</div>
			)
		}else{
			return(
			<div className="col-md-6 col-sm-8 ">
				<h1 className="form-header">Sign Up</h1>
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
					<p className="text-muted help">{this.state.help}</p>
				</form>
			</div>
			)
		}
	}
}