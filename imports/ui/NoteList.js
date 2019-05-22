import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'; 
import { Session } from 'meteor/session'

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NotesListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import { Notes } from '../api/notes';

export const NoteList = (props) => {

	return (
		<div className="item-list">
			<NoteListHeader />
			
			{props.notes.map((note)=> {
				return <NoteListItem key={note._id} note={note}/>;
			})}
			
			<NoteListEmptyItem />
		</div>
	)
}

NoteList.proptypes = {
	notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
	Meteor.subscribe('notes');
	
	const selectedNoteId = Session.get('selectedNoteId');

	return {
		notes: Notes.find({}, {
				sort: {updatedAt: -1} // most recent sort
			}).fetch().map((note) => {
			return {
				...note,
				selected: note._id === selectedNoteId
			}
		})
	}
}, NoteList);




