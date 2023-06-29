'use strict'
import mongoose from 'mongoose';
import conf from '../config';

const db = mongoose.createConnection(conf.get('mongodb'), {
	serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
});

db.on('connecting', () => {
	console.log('connecting to mongodb');
});

db.on('connected', () => {
	console.log('connected to mongodb');
});

db.on('error', (err) => {
	console.error(" Obs! There was an unexpected error connecting to the database.", err?.message);
	process.exit();
});

db.on('disconnected', () => {
	console.log('connection disconnected');
});

export default db;