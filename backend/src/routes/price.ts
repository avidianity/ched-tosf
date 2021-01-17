import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { Price } from '../models/Price';
import 'express-async-errors';
import { Validation } from '../helpers';

const router = Router();

router.get('/', async (req, res) => {
	return res.json(await Price.find());
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const price = await Price.findOne(id, { order: { updatedAt: 'DESC' } });

	if (!price) {
		throw new NotFoundException('Price does not exist.');
	}

	return res.json(price);
});

router.post(
	'/',
	[
		body('type')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString()
			.bail()
			.isIn([
				'Tuition Fees',
				'Athletic Fee',
				'Computer Fee',
				'Cultural Fee',
				'Development Fee',
				'Guidance Fee',
				'Handbook Fee',
				'Laboratory Fee',
				'Library Fee',
				'Medical & Dental Fee',
				'Registration Fee',
				'Admission Fee',
				'Entrance Fee',
				'Others',
			]),
		body('name').notEmpty().withMessage('is required.').bail().isString(),
		body('amount').notEmpty().withMessage('is required.').bail().isString(),
		body('first').notEmpty().withMessage('is required.').bail().isString(),
		body('second').notEmpty().withMessage('is required.').bail().isString(),
		body('third').notEmpty().withMessage('is required.').bail().isString(),
		body('fourth').notEmpty().withMessage('is required.').bail().isString(),
	],
	Validation.validate(),
	async (req: Request, res: Response) => {
		return res.json(await new Price(req.body).save());
	}
);

function update() {
	return [
		[
			body('type')
				.optional()
				.bail()
				.isString()
				.bail()
				.isIn([
					'Tuition Fees',
					'Athletic Fee',
					'Computer Fee',
					'Cultural Fee',
					'Development Fee',
					'Guidance Fee',
					'Handbook Fee',
					'Laboratory Fee',
					'Library Fee',
					'Medical & Dental Fee',
					'Registration Fee',
					'Admission Fee',
					'Entrance Fee',
					'Others',
				]),
			body('name').optional().bail().isString(),
			body('amount').optional().bail().isString(),
			body('first').optional().bail().isString(),
			body('second').optional().bail().isString(),
			body('third').optional().bail().isString(),
			body('fourth').optional().bail().isString(),
		],
		async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new ValidationException(errors.array());
			}

			const id = req.params.id;

			const price = await Price.findOne(id, { relations: ['degrees'] });

			if (!price) {
				throw new NotFoundException('Price does not exist.');
			}

			const data = matchedData(req, { locations: ['body'] });

			return res.json(await price.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const price = await Price.findOne(id);

	if (!price) {
		throw new NotFoundException('Price does not exist.');
	}

	await price.remove();
	return res.sendStatus(204);
});

export const price = router;
