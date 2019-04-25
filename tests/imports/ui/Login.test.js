
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount } from 'enzyme';
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

		it("Should call loginWithPassword with from data", function() {
			const email = "jdiaz12345@test.com";
			const password = "password123";
			const spy = expect.createSpy();
			const wrapper = mount(
			   <MemoryRouter initialEntries={['/']} initialIndex={0}>
			       <Login loginWithPassword={spy} />
			   </MemoryRouter>
			);
 
			wrapper.find(Login).node.refs['email'].value = email;
			wrapper.find(Login).node.refs['password'].value = password;
			wrapper.find("form").simulate("submit")

			expect(spy.calls[0].arguments[0]).toEqual({ email })
			expect(spy.calls[0].arguments[1]).toEqual(password)
		});

		// will not work below, guess ill just use jest instead of expect

		// it("Should set loginWithPassword callback errors", function() {

		// 	const spy = expect.createSpy();
		// 	const wrapper = mount(
		// 	   <MemoryRouter initialEntries={['/']} initialIndex={0}>
		// 	       <Login loginWithPassword={spy} />
		// 	   </MemoryRouter>
		// 	);

		// 	wrapper.find('form').simulate('submit');
		// 	console.log(spy.calls[0].arguments[2]({error: 'error'}));
		// 	expect(wrapper.state('error').length).toNotBe(0);
		// });
	});
}




