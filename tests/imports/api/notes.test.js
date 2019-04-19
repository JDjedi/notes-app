import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from '../../../imports/api/notes';


if (Meteor.isServer) {
	describe('notes', function() {

		beforeEach(function() { // runs before every single test case
			Notes.remove({});	// remove all notes in db
			Notes.insert({
				_id: 'testNoteId1',
				title: 'Test Title',
				body: "My body for note",
				updatedAt: 0,
				userId: "testUserId1"
			})
		});

		it('It should insert new note', function() { // below accesses the method we want to test in notes.js 
			// use .apply() to pass in the userId and set it
			const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: 'testid'});
			// pass if there is a value and fail if there is not a value
			expect(Notes.findOne({_id: _id, userId: 'testid'})).toExist(); 
		});

		it('Should not insert note if not authenticated', function() {
			 expect(() => {
			 	Meteor.server.method_handlers['notes.insert']();
			 }).toThrow();
		});

		it('Should remove note', function() {
			Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId1'}, ['testNoteId'])

			expect(Notes.findOne({_id: 'testUserId1'})).toNotExist();
		})

	});
}


