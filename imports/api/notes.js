import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'; 


export const Notes = new Mongo.Collection('notes') // this argument names the collection

if (Meteor.isServer) {
	Meteor.publish('notes', function() {
		return Notes.find({ userId: this.userId })
	});
}

Meteor.methods({
	'notes.insert'() {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		return Notes.insert({
			title: '',
			body:'',
			userId: this.userId,
			updatedAt: new Date().getTime()
		})
	},

	'notes.removeAll'() {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Notes.remove({})
	},


	'notes.remove'(_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		new SimpleSchema({
			_id: {type: String, min: 1}
		}).validate({_id: _id})

		Notes.remove({ _id: _id})
	},

	'notes.update'(_id, updates) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		new SimpleSchema({
			_id: {
				type: String,
				min: 1
			},
			title: {
				type: String,
				optional: true
			},
			body: {
				type: String,
				optional: true
			}
		}).validate({
			_id,
			...updates
		});

		Notes.update({
			_id,
			userId: this.userId
		}, {
			$set: {
				updatedAt: new Date().getTime(),
				...updates
			}	
		})
	}
})







