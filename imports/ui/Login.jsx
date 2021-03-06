import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'; 


export class Login extends React.Component {
	constructor(props) {
		super(props);				
		this.state = {
			error: ''
		};
	}

	handleSubmit(e) {
		e.preventDefault(); 

		let email = this.refs.email.value.trim(); 
		let password = this.refs.password.value.trim();

		this.props.loginWithPassword({email}, password, (err) => {
			if (err) {
				this.setState({error: "Unable to login, check email and or password."})
			} else {
				this.setState({error: ''})
			}
		})
	}

	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Login</h1>

					{this.state.error ? <p>{this.state.error}</p> : undefined} 


					<form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate className="boxed-view__form">
						<input type="email" ref="email" name="email" placeholder="Email"/> 
						<input type="password" ref="password" name="password" placeholder="Password"/>
						<button className="button">Login</button>
					</form>

					<Link to="/signup">Need to create an account?</Link>
				</div>
			</div>

		)
	}
}

Login.proptypes = {
	loginWithPassword: React.PropTypes.func.isRequired
}

export default createContainer(() => {
	return {
		loginWithPassword: Meteor.loginWithPassword
	}
}, Login);



