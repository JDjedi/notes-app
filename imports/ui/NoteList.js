import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'; 

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NotesListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import { Notes } from '../api/notes';

export const NoteList = (props) => {

	return (
		<div>
			{/* NoteList - {props.notes.length} */}
			<NoteListHeader />
			<NoteListEmptyItem />
			{props.notes.map((note)=> {
				return <NoteListItem key={note._id} note={note}/>;
			})}

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