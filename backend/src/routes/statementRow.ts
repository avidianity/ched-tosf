import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { Validation } from '../helpers';
import { Statement } from '../models/Statement';
import { StatementRow } from '../models/StatementRow';
import 'express-async-errors';

const router = Router();

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const row = await StatementRow.findOne(id);
	if (!row) {
		throw new NotFoundException('Row does not exist.');
	}
	return res.json(row);
});

router.post(
	'/',
	[
		body('title').notEmpty().withMessage('is required.').bail().isString(),
		body('description')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('code').notEmpty().withMessage('is required.').bail().isString(),
		body('amount').notEmpty().withMessage('is required.').bail().isString(),
		body('statementId')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.custom(Validation.exists(Statement, 'id')),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationException(errors.array());
		}

		const data = matchedData(req, { locations: ['body'] });

		return res.json(await new StatementRow(data).save());
	}
);

function update() {
	return [
		[
			body('title').optional().bail().isString(),
			body('description').optional().bail().isString(),
			body('code').optional().bail().isString(),
			body('amount').optional().bail().isString(),
		],
		async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new ValidationException(errors.array());
			}

			const id = req.params.id;

			const row = await StatementRow.findOne(id);

			if (!row) {
				throw new NotFoundException('Row does not exist.');
			}

			const data = matchedData(req, { locations: ['body'] });

			return res.json(await row.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const row = await StatementRow.findOne(id);
	if (!row) {
		throw new NotFoundException('Row does not exist.');
	}

	await row.remove();

	return res.sendStatus(204);
});

export const statementRow = router;
