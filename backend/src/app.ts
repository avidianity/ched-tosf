import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { tosf, auth, statement, fee, statementRow, degree, billingForm, billingFormRow, billingDetail, billingDetailRow } from './routes';
import { auth as a, errorHandler } from './middlewares';
import './shims';
import 'express-async-errors';
const app = express();

app.use(json());
app.use(
	cors({
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	})
);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/auth', auth);

app.use('/api/tosfs', a(tosf));
app.use('/api/tosfs/fees', a(fee));

app.use('/api/degrees', a(degree));

app.use('/api/statements', a(statement));
app.use('/api/statements/rows', a(statementRow));

app.use('/api/billing/forms', a(billingForm));
app.use('/api/billing/forms/row', a(billingFormRow));

app.use('/api/billing/details', a(billingDetail));
app.use('/api/billing/details/row', a(billingDetailRow));

app.use((_req, res) => {
	return res.status(404).end();
});

app.use(errorHandler);

export default app;