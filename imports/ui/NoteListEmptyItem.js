import { Meteor } from 'meteor/meteor';
import React from 'react';

import { Notes } from '../api/notes';



export default class NoteListEmptyItem extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			notes: []
		}
	}

	componentDidMount() {
		this.notesTracker = Tracker.autorun(() => {
			Meteor.subscribe('notes')
			const returnedLinks = Notes.find({}).fetch();

			this.setState({notes: returnedLinks})
		})
	}

	onClick(e) {
		e.preventDefault()
		Meteor.call('notes.removeAll', (err, res) => {
			if (err) {
				this.setState({error: err.reason})
			}
		})
	}

	noNotesMessage(notes_length) {
		if (notes_length === 0) {
				return(<div><p>There are currently no notes</p> </div>)
		}
	}

	render() {
		return (
			<div>
				
				<button onClick={this.onClick.bind(this)}>Clear Notes</button>
				{ this.state.error ? <p>{this.state.error}</p> : undefined}
				{console.log(this.state.notes.length)}
				{this.noNotesMessage(this.state.notes.length)}
			</div>
		)
	}
}






