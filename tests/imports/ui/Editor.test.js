import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from '../../../imports/ui/Editor';
import { notes } from '../../../imports/fixtures/fixtures'

if (Meteor.isClient) {
	describe('Editor', function() {
		let browserHistory;
		let call;

	    beforeEach(() => {
			call = expect.createSpy();

			browserHistory = {
				...history,
				push: expect.createSpy()
			};

			Session = {
				set: expect.createSpy()
			};
	    });

		it('Should render pick note message', function() {
			const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>)

			expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
		});
	});
}


