import React from 'react';
import { Meteor } from 'meteor/meteor'

import PrivateHeader from './PrivateHeader';

export default () => {
	return(
		<div>
			<PrivateHeader title="Dashboard"/>
			<div className="page-content">
				<p>Dashboard Page Content</p>
			</div>
		</div>
	)
}