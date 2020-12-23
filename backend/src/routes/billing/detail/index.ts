import { Request, Response, Router } from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { Validation } from '../../../helpers';
import { BillingDetail } from '../../../models/BillingDetail';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json(await BillingDetail.find({ relations: ['rows'] }));
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const detail = await BillingDetail.findOne(id, { relations: ['rows'] });
	if (!detail) {
		throw new NotFoundException('Billing Detail does not exist.');
	}
	return res.json(detail);
});

router.post(
	'/',
	[
		body('school').notEmpty().withMessage('is required.').bail().isString(),
		body('schoolAddress')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('referenceNumber')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('date')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isDate()
			.withMessage('should be a valid date.')
			.bail()
			.toDate(),
		body('pageTotal')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('pageAccumulatedTotal')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		body('total').notEmpty().withMessage('is required.').bail().isString(),
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
	Validation.validate(),
	async (req: Request, res: Response) => {
		const data = req.body;
		return res.json(await new BillingDetail(data).save());
	}
);

function update() {
	return [
		[
			body('school').optional().bail().isString(),
			body('schoolAddress').optional().bail().isString(),
			body('referenceNumber').optional().bail().isString(),
			body('date')
				.optional()
				.bail()
				.isDate()
				.withMessage('should be a valid date.')
				.bail()
				.toDate(),
			body('pageTotal').optional().bail().isString(),
			body('pageAccumulatedTotal').optional().bail().isString(),
			body('total').optional().bail().isString(),
			body('preparedBy').optional().bail().isString(),
			body('certifiedBy').optional().bail().isString(),
			body('approvedBy').optional().bail().isString(),
		],
		Validation.validate(),
		async (req: Request, res: Response) => {
			const data = req.body;
			const id = req.params.id;

			const detail = await BillingDetail.findOne(id, {
				relations: ['rows'],
			});
			if (!detail) {
				throw new NotFoundException('Billing Detail does not exist.');
			}

			return res.json(await detail.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const detail = await BillingDetail.findOne(id, { relations: ['rows'] });
	if (!detail) {
		throw new NotFoundException('Billing Detail does not exist.');
	}

	await detail.remove();
	return res.sendStatus(204);
});

export const billingDetail = router;
