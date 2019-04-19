import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser } from '../../../imports/api/users';

if (Meteor.isServer) {
	describe('User', function() {
		it('It should allow valid email address', function() {
			const testUser = {
				emails: [
					{
						address: "validEmail@example.com"
					}
				]
			}
			const res = validateNewUser(testUser);
			expect(res).toBe(true);
		});

		it('It should reject invalid email', function() { // this is meant to pass if the validation fails!
			const testUser = {
				emails: [
					{
						address: "validEmailexample.com"
					}
				]
			}

			expect(() => {
				validateNewUser(testUser)
			}).toThrow()
		})
	});
};











