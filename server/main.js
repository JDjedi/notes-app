import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';


import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-config.js';


Meteor.startup(() => {
});

// *** pattern ***
// req comes in
// run our middleware one at a time
// send them that page



