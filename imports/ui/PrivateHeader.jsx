import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types'; 


// stateless functional component pattern when needing proptypes to be passed
export const PrivateHeader = (props) => {
	const navImageSource = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg' ; // will show one or the other based on the session variable

	return(
		<div className="header">
			<div className="header__content">
				<img onClick={props.handleNavToggle} src={navImageSource} /> {/* defined a few lines above */}
				<h1>{props.title}</h1>
				<h4><button className="button button--header" onClick={() => { props.handleLogout() }}>Logout</button></h4>
				</div>
		</div>
	)
};

PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired,
	handleLogout: React.PropTypes.func.isRequired,
	isNavOpen: React.PropTypes.bool.isRequired,
	handleNavToggle: React.PropTypes.func.isRequired
}

// BELOW IS IMPORTANT READ YOUR COMMENTS!
export default createContainer(() => { // props passed through here automatically, so no need to define or pass title fromt he component above
	return {
		handleLogout: () => {
			Accounts.logout();
		},

		handleNavToggle: () => {
			Session.set('isNavOpen', !Session.get('isNavOpen'))	// flips said value!
		},

		isNavOpen: Session.get('isNavOpen')
	}
}, PrivateHeader);


// old functionality, changed to below stateless functional componenet
// export default class PrivateHeader extends React.Component {
// 	onLogout(e) {
// 	    Accounts.logout(); 
// 	}

// 	render() {
// 		return(
// 			<div>
// 				<h1>{this.props.title}</h1>
// 				<button onClick={this.onLogout.bind(this)}>Logout</button>
// 			</div>
// 		)
// 	}
// }

// export default PrivateHeader;

