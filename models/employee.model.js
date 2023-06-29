'use strict'
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import db from '.';

const Schema = mongoose.Schema;

let employeeSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		validate: {
			isAsync: false,
			validator: isEmail,
			message: 'Invalid email'
		}
	},
	departmentId: {
		type: mongoose.Types.ObjectId
	}
}, {  })

export default db.model('employees', employeeSchema)
