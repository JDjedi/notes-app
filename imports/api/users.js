import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema"; // takes one argument, an obj with the props of our schema
import { Accounts } from "meteor/accounts-base";

Accounts.validateNewUser(user => {
	const email = user.emails[0].address;

	new SimpleSchema({
		email: { type: String, regEx: SimpleSchema.RegEx.EmailWithTLD }
	}).validate({ email: email });

	return true;

	// Great simple schema guide code below
	// const petSchema = new SimpleSchema({
	// 	name: {type: String, min: 1, max: 30}, // validates the name obj prop
	// 	age: {type: Number, min: 0},
	// 	contactNumber: {type: String, optional: true, regEx: SimpleSchema.RegEx.Phone },
	// 	contactEmail: {type: String, optional: true, regEx: SimpleSchema.RegEx.EmailWithTLD}
	// })

	// petSchema.validate({ // only throws errors if the schema is not valid
	// 	name: 'JD', // this gets validated and comes back as true
	// 	age: 2,
	// 	contactNumber: "2105199874",
	// 	contactEmail: "JDjedi1201@gmail.com"
	// })
});
