import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import PropTypes from 'prop-types'; 

import { Notes } from '../api/notes';

export class Editor extends React.Component {

	handleBodyChange(e) {
		this.props.call('notes.update', this.props.note._id, {
			body: e.target.value
		})
	}

	handleTitleChange(e) {
		this.props.call('notes.update', this.props.note._id, {
			title: e.target.value
		})
	}


	render() {
		if (this.props.note) {
			return (
				<div>
					<input type="text" value={this.props.note.title} placeholder="Your note title here" onChange={this.handleTitleChange.bind(this)}/>
					<textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} cols="30" rows="10"></textarea>
					<button>Delete Note</button>
				</div>
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
		selectedNoteId: selectedNoteId,
		note: Notes.findOne(selectedNoteId),
		call: Meteor.call
	}
}, Editor);
