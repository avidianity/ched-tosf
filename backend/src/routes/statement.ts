import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { Statement } from '../models/Statement';
import { StatementRow } from '../models/StatementRow';
import 'express-async-errors';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json(await Statement.find({ relations: ['rows'] }));
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const statement = await Statement.findOne(id, { relations: ['rows'] });

	if (!statement) {
		throw new NotFoundException('Statement does not exist.');
	}

	return res.json(statement);
});

router.post(
	'/',
	[
		body('school').notEmpty().withMessage('is required.').bail().isString(),
		body('schoolAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('date').notEmpty().withMessage('is required.').bail().isDate().withMessage('should be a valid date.').bail().toDate(),
		body('to').notEmpty().withMessage('is required.').bail().isString(),
		body('toAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('rows').isArray().bail(),
		body('rows.*.title').notEmpty().withMessage('is required.').bail().isString(),
		body('rows.*.description').notEmpty().withMessage('is required.').bail().isString(),
		body('rows.*.code').notEmpty().withMessage('is required.').bail().isString(),
		body('rows.*.amount').notEmpty().withMessage('is required.').bail().isString(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationException(errors.array());
		}

		const data = matchedData(req, { locations: ['body'] });

		const statement = await new Statement(data).save();

		Promise.all(
			data.rows.map((row: any) => {
				const model = new StatementRow({
					...row,
				});
				model.statement = statement;
				return model.save();
			})
		).catch(console.log);

		return res.json(statement);
	}
);

function update() {
	return [
		[
			body('school').optional().bail().isString(),
			body('schoolAddress').optional().bail().isString(),
			body('referenceNumber').optional().bail().isString(),
			body('date').optional().bail().isDate().withMessage('should be a valid date.').bail().toDate(),
			body('to').optional().bail().isString(),
			body('toAddress').optional().bail().isString(),
			body('rows').optional().bail().isArray(),
			body('rows.*.title').notEmpty().withMessage('is required.').bail().isString(),
			body('rows.*.description').notEmpty().withMessage('is required.').bail().isString(),
			body('rows.*.code').notEmpty().withMessage('is required.').bail().isString(),
			body('rows.*.amount').notEmpty().withMessage('is required.').bail().isString(),
		],
		async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new ValidationException(errors.array());
			}

			const id = req.params.id;
			const statement = await Statement.findOne(id, {
				relations: ['rows'],
			});
			if (!statement) {
				throw new NotFoundException('Statement does not exist.');
			}

			const data = matchedData(req, { locations: ['body'] });

			if (data.rows) {
				Promise.all(statement.rows.map((row) => row.remove()))
					.then(() =>
						Promise.all(
							data.rows.map((row: any) => {
								const model = new StatementRow({
									...row,
									statementId: statement.id,
								});
								model.statement = statement;
								console.log(model);
								return model.save();
							})
						).catch(console.log)
					)
					.catch(console.log);
			}

			return res.json(await statement.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const statement = await Statement.findOne(id);
	if (!statement) {
		throw new NotFoundException('Statement does not exist.');
	}
	await statement.remove();
	return res.sendStatus(204);
});

export const statement = router;
