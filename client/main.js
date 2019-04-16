import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes'
import '../imports/startup/simple-schema-config.js';

// track status of what you want it to track and acts or reacts on it
Tracker.autorun(() => { 
	const isAuthenticated = !!Meteor.userId();  // !! takes a falsy or truthy value and makes it a real true or false, boolean
	onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
	ReactDOM.render(routes, document.getElementById('app'));
});



