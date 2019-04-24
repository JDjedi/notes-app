import React from 'react';
import { Meteor } from 'meteor/meteor'

import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types'; 

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


// stateless functional component pattern when needing proptypes to be passed
export const PrivateHeader = (props) => {
	return(
		<div className="header">
			<div className="wrapper">
				<h3>{props.title}</h3>
				<h4>{props.testComment}</h4>
				<button className="button button--header" onClick={() => { props.handleLogout() }}>Logout</button>
			</div>
		</div>
	)
};

PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired,
	handleLogout: React.PropTypes.func.isRequired
}





export default createContainer(() => { // props passed through here automatically, so no need to define or pass title fromt he component above
	return {
		handleLogout: () => {
			Accounts.logout();
		}
	}
}, PrivateHeader);

// export default PrivateHeader;

