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
		})
	});
}


