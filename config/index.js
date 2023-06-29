import dotenv from 'dotenv';
import fs from 'fs';
import convict from 'convict';

// to load .env file
dotenv.config();

// i use convict and dotenv module to setup env and confuguration
const config = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 3000,
		env: 'PORT'
	},
	mongodb: {
		doc: 'URL to mongodb.',
		format: String,
		default: '',
		env: 'MONGO_URI'
	}
});

const env = config.get('env');
try {
	const path = `${env}.json`;
	fs.accessSync(path, fs.F_OK);
	config.loadFile(path);
} catch (error) {
	console.log(error);
	console.warn('No config file found, use defaults');
}

config.validate();

export default config;