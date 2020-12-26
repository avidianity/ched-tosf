import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { Validation } from '../helpers';
import { Degree } from '../models/Degree';
import { Fee } from '../models/Fee';
import { TOSF } from '../models/TOSF';
import 'express-async-errors';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const fee = await Fee.findOne(id, { relations: ['degrees'] });

	if (!fee) {
		throw new NotFoundException('Fee does not exist.');
	}

	return res.json(fee);
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
			]),
		body('degrees').isArray().bail(),
		body('year').notEmpty().withMessage('is required.').bail().isString(),
		body('costPerUnit').notEmpty().withMessage('is required.').bail().isString(),
		body('coverage').notEmpty().withMessage('is required.').bail().isString(),
		body('frequencyPerAY').notEmpty().withMessage('is required.').bail().isString(),
		body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('dateOfApproval').notEmpty().withMessage('is required.').bail().isDate().bail().toDate(),
		body('description').notEmpty().withMessage('is required.').bail().isString(),
		body('tosfId').notEmpty().withMessage('is required.').bail().custom(Validation.exists(TOSF, 'id')),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationException(errors.array());
		}

		const data = matchedData(req, { locations: ['body'] });

		data.tosf = await TOSF.findOneOrFail(data.tosfId);

		data.degrees = await Promise.all(
			data.degrees.map(async (degree: any) => {
				const exist = await Degree.findOne({
					where: {
						name: degree,
					},
				});
				if (!exist) {
					return await new Degree({ name: degree }).save();
				}
				return exist;
			})
		);

		return res.json(await new Fee(data).save());
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
				]),
			body('degrees').isArray().bail(),
			body('year').optional().bail().isString(),
			body('costPerUnit').optional().bail().isString(),
			body('coverage').optional().bail().isString(),
			body('frequencyPerAY').optional().bail().isString(),
			body('referenceNumber').optional().bail().isString(),
			body('dateOfApproval').optional().bail().isDate().bail().toDate(),
			body('description').optional().bail().isString(),
		],
		async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new ValidationException(errors.array());
			}

			const id = req.params.id;

			const fee = await Fee.findOne(id, { relations: ['degrees'] });

			if (!fee) {
				throw new NotFoundException('Fee does not exist.');
			}

			const data = matchedData(req, { locations: ['body'] });

			data.degrees = await Promise.all(
				data.degrees.map(async (name: string) => {
					const degree = await Degree.findOne({
						where: { name },
					});
					if (!degree) {
						return await new Degree({ name }).save();
					}
					return degree;
				})
			);

			return res.json(await fee.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:tosfID/tosf', async (req: Request, res: Response) => {
	const id = req.params.tosfID;
	const tosf = await TOSF.findOne(id, { relations: ['fees'] });

	if (!tosf) {
		throw new NotFoundException('TOSF does not exist.');
	}

	await Promise.all(tosf.fees.map((fee) => fee.remove()));
	return res.sendStatus(204);
});

router.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const fee = await Fee.findOne(id);

	if (!fee) {
		throw new NotFoundException('Fee does not exist.');
	}

	await fee.remove();
	return res.sendStatus(204);
});

export const fee = router;
