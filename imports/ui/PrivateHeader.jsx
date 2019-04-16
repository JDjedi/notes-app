import React from 'react';
import { Meteor } from 'meteor/meteor'

import { Accounts } from 'meteor/accounts-base';
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
const PrivateHeader = (props) => {
	return(
		<div className="header">
			<div className="wrapper">
				<h3>{props.title}</h3>
				<button className="button button--header" onClick={() => {
					Accounts.logout()
				}}>Logout</button>
			</div>
		</div>
	)
};


PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired,
}


export default PrivateHeader;
