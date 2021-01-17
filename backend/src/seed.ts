import './server';
import db from './database';
import prices from './prices.json';
import { Price } from './models/Price';

db.then(async () => {
	try {
		await Promise.all(prices.map((price) => new Price(price).save()));
	} catch (error) {
		console.error(error);
	} finally {
		process.exit(0);
	}
});
