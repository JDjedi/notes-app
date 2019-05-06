import React from 'react';
import { Meteor } from 'meteor/meteor'

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList'

export default () => {
	return(
		<div>
			<PrivateHeader title="Dashboard"/>
			<div className="page-content">
				{console.log(location.pathname)}
				<NoteList />

			</div>
		</div>
	)
}

