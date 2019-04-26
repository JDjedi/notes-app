import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'; 

import NoteListHeader from './NoteListHeader'
import { Notes } from '../api/notes';


export const NoteList = (props) => {
	return (
		<div>
			NoteList - {props.notes.length}
			<NoteListHeader />
		</div>
	)
}

NoteList.proptypes = {
	notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
	Meteor.subscribe('notes');

	// keys defined in the object below become props for the component passed in, in this case the NoteList component
	return {
		notes: Notes.find().fetch()
	}
}, NoteList);