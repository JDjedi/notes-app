import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import { createMemoryHistory } from 'history/createMemoryHistory';

import { Notes } from '../api/notes';

export class Editor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: ''
		};

	    if (process.env.NODE_ENV==='test') {
	   		const history = createMemoryHistory();
	    } else {
	    	const history = createBrowserHistory();
	    }
	}

	handleBodyChange(e) {
		const body = e.target.value
		this.setState({ body })
		this.props.call('notes.update', this.props.note._id, {
			body: body
		})
	}

	handleTitleChange(e) {
		const title = e.target.value
		this.setState({ title })
		this.props.call('notes.update', this.props.note._id, {
			title: title
		})
	}

	removeNote(e) {
		this.props.call('notes.remove', this.props.note._id);
		this.props.history.push('/dashboard'); // this rerenders the page after deleting the note thus getting rid of :id in the URL
	}

	componentDidUpdate(prevProps, prevState) {
		const currentNoteId = this.props.note ? this.props.note._id : undefined;
		const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

		if (currentNoteId && currentNoteId !== prevNoteId) {
			this.setState({
				title: this.props.note.title,
				body: this.props.note.body
			})
		}
	}

	render() {
		if (this.props.note) {
			return (
				<div className="editor">
					<input type="text" value={this.state.title}
						placeholder="Your note title here" 
						onChange={this.handleTitleChange.bind(this)}
					/>
					<textarea value={this.state.body}
						placeholder="Your note here"
						onChange={this.handleBodyChange.bind(this)} cols="30" rows="10">
					</textarea>
					<button onClick={this.removeNote.bind(this)}>Delete Note</button>
				</div>
			)
		} else if (this.props.selectedNoteId) {
			return (
				<div className="editor">
					<p>Note not found!</p>
				</div>
			)
		} else {
			return (
				<div className="editor">
					<p>Pick or create a note to get started.</p>
				</div>
			)
		}
	}
}

Editor.propTypes = {
	note: React.PropTypes.object,
	selectedNoteId: React.PropTypes.string,
	call: React.PropTypes.func.isRequired,
	history: React.PropTypes.object.isRequired
};

export default createContainer(() => {
	const selectedNoteId = Session.get('selectedNoteId');

	return {
		selectedNoteId: selectedNoteId,
		note: Notes.findOne(selectedNoteId),
		call: Meteor.call,
		history: history
	}
}, Editor);




