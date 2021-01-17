import { Request, Response, Router } from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { Validation } from '../../../helpers';
import { BillingDetail } from '../../../models/BillingDetail';
import { BillingDetailRow } from '../../../models/BillingDetailRow';

const router = Router();

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const row = await BillingDetailRow.findOne(id);
	if (!row) {
		throw new NotFoundException('Billing Detail Row does not exist.');
	}

	return res.json(row);
});

router.post(
	'/',
	[
		body('sequenceNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('lastName').notEmpty().withMessage('is required.').bail().isString(),
		body('givenName').notEmpty().withMessage('is required.').bail().isString(),
		body('middleInitial').notEmpty().withMessage('is required.').bail().isString(),
		body('sex').notEmpty().withMessage('is required.').bail().isString(),
		body('birthday').notEmpty().withMessage('is required.').bail().isDate().withMessage('must be a valid date').bail().toDate(),
		body('degreeProgram').notEmpty().withMessage('is required.').bail().isString(),
		body('year').notEmpty().withMessage('is required.').bail().isString(),
		body('email').notEmpty().withMessage('is required.').bail().isString(),
		body('number').notEmpty().withMessage('is required.').bail().isString(),
		body('fee').notEmpty().withMessage('is required.').bail().isString(),
		body('remarks').notEmpty().withMessage('is required.').bail().isString(),
		body('detailId').notEmpty().withMessage('is required.').bail().custom(Validation.exists(BillingDetail, 'id')),
	],
	Validation.validate(),
	async (req: Request, res: Response) => {
		const data = req.body;
		data.detail = await BillingDetail.findOneOrFail(data.detailId);
		return res.json(await new BillingDetailRow(data).save());
	}
);

function update() {
	return [
		[
			body('sequenceNumber').optional().bail().isString(),
			body('lastName').optional().bail().isString(),
			body('givenName').optional().bail().isString(),
			body('middleInitial').optional().bail().isString(),
			body('sex').optional().bail().isString(),
			body('birthday').optional().bail().isDate().withMessage('must be a valid date').bail().toDate(),
			body('degreeProgram').optional().bail().isString(),
			body('year').optional().bail().isString(),
			body('email').optional().bail().isString(),
			body('number').optional().bail().isString(),
			body('fee').optional().bail().isString(),
			body('remarks').optional().bail().isString(),
		],
		Validation.validate(),
		async (req: Request, res: Response) => {
			const data = req.body;
			const id = req.params.id;
			const row = await BillingDetailRow.findOne(id);
			if (!row) {
				throw new NotFoundException('Billing Detail Row does not exist.');
			}
			return res.json(await row.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id/billing', async (req, res) => {
	const id = req.params.id;

	const detail = await BillingDetail.findOne(id, { relations: ['rows'] });

	if (!detail) {
		throw new NotFoundException('Billing Detail does not exist.');
	}

	await Promise.all(detail.rows.map((row) => row.remove()));
	return res.sendStatus(204);
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const row = await BillingDetailRow.findOne(id);
	if (!row) {
		throw new NotFoundException('Billing Detail Row does not exist.');
	}

	await row.remove();

	return res.sendStatus(204);
});

export const billingDetailRow = router;
