const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	about: {
		type: String,

	},
	avatarUrl: String,
},
	{
		timestamps: true,
	},

);
module.exports = mongoose.model('BlogUser', UserSchema);