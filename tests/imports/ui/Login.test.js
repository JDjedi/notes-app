
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { Login } from '../../../imports/ui/Login';

if (Meteor.isClient) {
	describe('Login', function() {
		it("Should show error messages", function() {
			const error = "This is not working";
			// had to use shallow here below instead of mount() bc the history componenet did not allow mount to work properly
			const wrapper = shallow(<Login loginWithPassword={() => {}} /> ); 
			wrapper.setState({ error: error })

			expect(wrapper.find('p').text()).toBe(error);

			wrapper.setState({ error: ""}); // effectively hiding and showing the paragraph
			expect(wrapper.find("p").length).toBe(0);
		});
	});
}