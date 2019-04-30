import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { createBrowserHistory } from 'history';

import { routes, onAuthChange } from '../imports/routes/routes'
import '../imports/startup/simple-schema-config.js';

const history = createBrowserHistory();

// track status of what you want it to track and acts or reacts on it
Tracker.autorun(() => { 
	const isAuthenticated = !!Meteor.userId();  // !! takes a falsy or truthy value and makes it a real true or false, boolean
	onAuthChange(isAuthenticated)
})

Tracker.autorun(() => {
	// this will return either undefined or a string
	// return a string is there is noteId
	const selectedNoteId = Session.get('selectedNoteId')

	if (selectedNoteId) {
		history.replace(`/dashboard/${selectedNoteId}`)
	}
})

Meteor.startup(() => {
	Session.set('selectedNoteId', undefined);
	ReactDOM.render(routes, document.getElementById('app'));
});



