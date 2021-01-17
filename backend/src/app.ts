import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {
	tosf,
	auth,
	statement,
	fee,
	statementRow,
	degree,
	billingForm,
	billingFormRow,
	billingDetail,
	billingDetailRow,
	file,
	count,
	student,
	price,
} from './routes';
import { auth as a, errorHandler } from './middlewares';
import 'express-async-errors';
import path from 'path';
import passport from 'passport';

const app = express();

app.use(json());
app.use(
	cors({
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		exposedHeaders: ['X-File-Name'],
	})
);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.set('templatesPath', path.resolve(__dirname, '../templates'));

// routes
app.use('/api/auth', auth);

app.use('/api/tosfs', ...a(tosf));
app.use('/api/tosfs/fees', ...a(fee));

app.use('/api/degrees', ...a(degree));

app.use('/api/statements', ...a(statement));
app.use('/api/statements/rows', ...a(statementRow));

app.use('/api/billing/forms', ...a(billingForm));
app.use('/api/billing/forms/row', ...a(billingFormRow));

app.use('/api/billing/details', ...a(billingDetail));
app.use('/api/billing/details/row', ...a(billingDetailRow));

app.use('/api/prices', ...a(price));

app.use('/api/students', ...a(student));

app.use('/api/files', ...a(file));

app.use('/api/counts', ...a(count));

app.use((_req, res) => {
	return res.status(404).end();
});

app.use(errorHandler);

export default app;
