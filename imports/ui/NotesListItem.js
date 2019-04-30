import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListItem = (props) => {
	return (
		<div onClick={() => {
			props.Session.set('selectedNoteId', props.note._id);
		}}>
			<h5>{ props.note.title || "Untitled note" }</h5>
			{/*<p> { props.note.updatedAt } </p> */}
		</div>
	);
};

NoteListItem.propTypes = {
	note: React.PropTypes.object.isRequired,
	Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
	return { Session }
}, NoteListItem);