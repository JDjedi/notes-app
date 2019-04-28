import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'; 

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NotesListItem';
import { Notes } from '../api/notes';

export const NoteList = (props) => {

	return (
		<div>
			{/* NoteList - {props.notes.length} */}
			<NoteListHeader />
			{props.notes.map((note)=> {
				return <NoteListItem key={note._id} note={note}/>;
			})}
			NoteList { props.notes.length }
		</div>
	)
}

NoteList.proptypes = {
	notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
	Meteor.subscribe('notes');


	return {
		notes: Notes.find().fetch()
	}
}, NoteList);