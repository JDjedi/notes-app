import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from '../../../imports/ui/Editor';
import { notes } from '../../../imports/fixtures/fixtures'

if (Meteor.isClient) {
	describe('Editor', function() {
		let history;
		let call;

	    beforeEach(() => {
			call = expect.createSpy();

			history = {
				push: expect.createSpy()
			};

			Session = {
				set: expect.createSpy()
			};
	    });

		it('Should render pick note message', function() {
			const wrapper = mount(<Editor history={history} call={call}/>)
			expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
		});

		it('Should render note not found message', function() {
			const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]}/>)
			expect(wrapper.find('p').text()).toBe('Note not found!');
		});

		it('Should remove note', function() {
			const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]} note={notes[0]}/>)
			wrapper.find('button').simulate('click');
			expect(history.push).toHaveBeenCalledWith('/dashboard');
			expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
		});

		it('Should update the note body on textarea change', function() {
			const newBody = "this is my new body text"
			const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]} note={notes[0]}/>)
			wrapper.find('textarea').simulate('change', {
				target: {
					value: newBody
				}
			});

			expect(wrapper.state('body')).toBe(newBody);
			expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody})
		});

		it('Should update the note title on change', function() {
			const newTitle = "this is my new title text"
			const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]} note={notes[0]}/>)
			wrapper.find('input').simulate('change', {
				target: {
					value: newTitle
				}
			});

			expect(wrapper.state('title')).toBe(newTitle);
			expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle})
		});

		it('Should setState for new note', function() {
			const wrapper = mount(<Editor history={history} call={call}/>)
			wrapper.setProps({ // only available in enzyme, not in reg components
				selectedNoteId: notes[0]._id,
				note: notes[0]
			});

			expect(wrapper.state('title')).toBe(notes[0].title)
			expect(wrapper.state('body')).toBe(notes[0].body)
		});

	});
}


