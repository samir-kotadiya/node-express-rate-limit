'use strict'
import mongoose from 'mongoose';
import db from '.';

const Schema = mongoose.Schema;

let departmentSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	
}, {  })

export default db.model('departmens', departmentSchema)
