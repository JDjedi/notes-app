import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'; 



export const NoteListHeader = (props) => {

	return (
		<div>
			<button onClick={() => {props.meteorCall('notes.insert')}}>New Note</button>
		</div>
	)
}



// keys defined in the object below become props for the component passed in, in this case the NoteList component
export default createContainer(() => {
	return {
		meteorCall: Meteor.call
	}
}, NoteListHeader)


