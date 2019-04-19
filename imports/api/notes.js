import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'; 


export const Notes = new Mongo.Collection('notes') // this argument names the collection

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


	'notes.remove'(_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		new SimpleSchema({
			_id: {type: String, min: 1}
		}).validate({_id: _id})

		Notes.remove({ _id: _id})
	}
})

