import express from 'express';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import cors from 'cors';
import Employee from './models/employee.model';
import Department from './models/department.model';
import { employeeSchema } from './validation/employee.validation';
import config from './config';

const app = express();
const port = config.get('port');
let requestCounts = {};

// Apply rate limiting middleware > tracking use as user-id from header
const trackRequests = (req, res, next) => {
	const userId = req.headers['user-id']; // Assuming you have a user ID in the request headers
	if (!requestCounts[userId]) {
		requestCounts[userId] = 1;
	} else {
		requestCounts[userId]++;
	}
	next();
}
const limiter = rateLimit({
	windowMs: 5 * 1000, // 5 sec
	max: 1, // maximum requests allowed per windowMs
	message: 'Too many requests, please try again later 5 second.',
});

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json({
	limit: '5mb'
}));

app.use(bodyParser.urlencoded({
	extended: true,
	limit: '5mb'
})); // support encoded bodies  

app.use(trackRequests);
app.use(limiter);

app.post('/employees', async (req, res) => {
	//console.log(requestCounts)
	try {
		// await Department.create({ name: 'MCA dept.' });
		const validation = employeeSchema.validate(req.body);
		console.log(validation.error)
		if (validation.error) {
			const e = validation.error.details.map((obj) => {
				return obj.message;
			});
			return res.status(400).send({ statusCode: 400, message: 'invalid payload' });
		}

		// validate department id
		const dept = await Department.findById(req.body.departmentId).select('id').lean();

		if (!dept) {
			return res.status(400).send({ statusCode: 400, message: 'invalid department id' });
		}

		let resp;
		if (req?.body?.id) {
			resp = await Employee.findOneAndUpdate({ _id: req?.body?.id }, { $set: req.body }, { upsert: true, new: true });
		} else {
			resp = await Employee.create(req.body);
		}

		return res.send({ message: 'success', data: resp });
	} catch (e) {
		console.log(e)
		return res.status(500).send({ statusCode: 500, messasge: e?.message ?? 'Internal server error' });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});
