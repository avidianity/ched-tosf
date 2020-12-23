import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { ValidationException } from '../exceptions/ValidationException';
import { Degree } from '../models/Degree';
import 'express-async-errors';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json(await Degree.find());
});

router.post(
	'/',
	[body('name').notEmpty().withMessage('is required.').bail().isString()],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationException(errors.array());
		}

		const { name } = matchedData(req, { locations: ['body'] });
		const degree = await Degree.findOne({
			where: {
				name,
			},
		});
		if (!degree) {
			return res.json(await new Degree({ name }).save());
		}
		return res.json(degree);
	}
);

export const degree = router;
