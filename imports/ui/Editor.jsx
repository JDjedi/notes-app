import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import PropTypes from 'prop-types'; 

import { Notes } from '../api/notes';

export class Editor extends React.Component {
	render() {
		if (this.props.note) {
			return (
				<p>We got the Note!</p>
			)
		} else if (this.props.selectedNoteId) {
			return (
				<p>Note not found!</p>
			)
		} else {
			return (
				<p>Pick or create a note to get started.</p>
			)
		}
	}
}

Editor.propTypes = {
	note: React.PropTypes.object,
	selectedNoteId: React.PropTypes.string
}

export default createContainer(() => {
	const selectedNoteId = Session.get('selectedNoteId');

	return {
		selectedNoteId,
		note: Notes.findOne(selectedNoteId)
	}
}, Editor);
