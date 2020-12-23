import app from './app';
import { config } from 'dotenv';
config();
import './database';

const port = process.env.APP_PORT;

const server = app.listen(port, () =>
	console.log(`⚡: Listening on port: ${port}`)
);
