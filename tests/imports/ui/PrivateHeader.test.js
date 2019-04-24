import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader from '../../../imports/ui/PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> )
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function () {
      const title = 'Test title';
      const wrapper = mount(  <PrivateHeader title="Test title" handleLogout={() => {}}/> );
      const actualTitle = wrapper.find('h3').text();

      expect(actualTitle).toBe(title);
    });

    it('should call the function', function() {
      const spy = expect.createSpy();
      spy(3, 4, 123);
      spy('Joonatan');
      expect(spy).toHaveBeenCalledWith('Joonatan');
    })

    it('should handleLogout on click', function() {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={ spy }/> )
      // simulate() simulates a 'click' on the button element specified in the .find() function
      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled(); // the tohavebeencalled() takes no arg and only checks to see if spy was called or not
    })

  });
}


// TEST_WATCH=1 meteor test --full-app --driver-package meteortesting:mocha