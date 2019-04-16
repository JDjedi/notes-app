import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
	constructor(props) {			// props come from without, state is defined from within the component
		super(props);				// need this to overide the React.component constructor
		this.state = {
			// count: 0
			error: ''
		};
	}
	// comments below are for state and setState examples
	// increment() {
	// 	this.setState({				// need setState to adjust state
	// 		count: this.state.count + 1
	// 	})
	// }

	handleSubmit(e) {
		e.preventDefault(); // prevents full page browser refresh, we don't need it right here for now

		let email = this.refs.email.value.trim(); // ref is used and pulled from down below
		let password = this.refs.password.value.trim();

		if (password.length < 9) {
			return this.setState({error: 'Password must be more than 8 characters long.'})
		}

		Accounts.createUser({email, password}, (error) => {
			//console.log('Signup callback', error.reason);
			if (error) {
				this.setState({error: error.reason})
				console.log(error)
			} else {
				this.setState({error: ''})
			}
		});
	}

	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Join</h1>

					{this.state.error && <p>{this.state.error}</p>} 

					<form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate className="boxed-view__form">
						<input type="email" ref="email" name="email" placeholder="Email"/> {/* ref is an identifier react can use to target*/}
						<input type="password" ref="password" name="password" placeholder="Password"/>
						<button className="button">Create Account</button>
					</form>
					<Link to="/login">Have an account?</Link>


					{
						// <p>{this.state.count}</p>
						// <button onClick={this.increment.bind(this)}>+1</button>
						// <button onClick={() => {this.setState({count: this.state.count - 1})}}>-1</button>
						// <Link to="/login">Have an account?</Link>
					}
				</div>
			</div>

		)
	}
}

