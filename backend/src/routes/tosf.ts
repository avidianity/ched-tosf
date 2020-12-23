import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { TOSF } from '../models/TOSF';
import 'express-async-errors';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json(await TOSF.find());
});

router.post(
	'/',
	[
		body('school').notEmpty().withMessage('is required.').bail().isString(),
		body('address')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('preparedBy')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('certifiedBy')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('approvedBy')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationException(errors.array());
		}

		const data = matchedData(req, { locations: ['body'] });
		const tosf = await new TOSF(data).save();
		return res.json(tosf);
	}
);

function update() {
	return [
		[
			body('school').optional().bail().isString(),
			body('address').optional().bail().isString(),
			body('preparedBy').optional().bail().isString(),
			body('certifiedBy').optional().bail().isString(),
			body('approvedBy').optional().bail().isString(),
		],
		async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new ValidationException(errors.array());
			}

			const data = matchedData(req, { locations: ['body'] });
			const id = req.params.id;
			const tosf = await TOSF.findOne(id);
			if (!tosf) {
				throw new NotFoundException('TOSF does not exist.');
			}
			return res.json(await tosf.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const tosf = await TOSF.findOne(id);
	if (!tosf) {
		throw new NotFoundException('TOSF does not exist.');
	}
	await tosf.remove();
	return res.sendStatus(204);
});

export const tosf = router;
