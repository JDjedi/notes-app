import React from 'react';
import PropTypes from 'prop-types'; 

const NoteListItem = (props) => {
	return (
		<div>
			<h5>{ props.note.title || "Untitled note" }</h5>
			<p> { props.note.updatedAt } </p>
		</div>
	);
};

NoteListItem.propTypes = {
	note: React.PropTypes.object.isRequired
};

export default NoteListItem;
