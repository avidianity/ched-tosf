import dayjs from 'dayjs';
import { Request, Response, Router } from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { exportAsFile, Validation } from '../../../helpers';
import { BillingDetail } from '../../../models/BillingDetail';
import fs from 'fs';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json(await BillingDetail.find({ relations: ['rows'], order: { updatedAt: 'DESC' } }));
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const detail = await BillingDetail.findOne(id, { relations: ['rows'] });
	if (!detail) {
		throw new NotFoundException('Billing Detail does not exist.');
	}
	return res.json(detail);
});

router.get('/:id/export', async (req, res) => {
	const id = req.params.id;
	const billingDetail = await BillingDetail.findOne(id, { relations: ['rows'] });
	if (!billingDetail) {
		throw new NotFoundException('Billing Form does not exist.');
	}

	const file = await exportAsFile(
		req.app.get('templatesPath'),
		'template-billing-detail.docx',
		{
			...billingDetail,
			date: dayjs(billingDetail.date).format('MMMM DD, YYYY'),
			rows: billingDetail.rows.map((row) => ({ ...row, birthday: dayjs(row.birthday).format('MM/DD/YYYY') })),
		},
		'Billing Detail'
	);
	if (!file) {
		return res.status(500).json({ message: 'Sorry, unable to export at the moment. Please try again later.' });
	}
	const binary = fs.readFileSync(file.path);
	res.setHeader('Content-Type', file.mimeType);
	res.setHeader('Content-Length', file.size);
	res.setHeader('X-File-Name', file.name);
	return res.send(binary);
});

router.post(
	'/',
	[
		body('school').notEmpty().withMessage('is required.').bail().isString(),
		body('schoolAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('date').notEmpty().withMessage('is required.').bail().isDate().withMessage('should be a valid date.').bail().toDate(),
		body('pageTotal').notEmpty().withMessage('is required.').bail().isString(),
		body('pageAccumulatedTotal').notEmpty().withMessage('is required.').bail().isString(),
		body('total').notEmpty().withMessage('is required.').bail().isString(),
		body('preparedBy').notEmpty().withMessage('is required.').bail().isString(),
		body('certifiedBy').notEmpty().withMessage('is required.').bail().isString(),
		body('approvedBy').notEmpty().withMessage('is required.').bail().isString(),
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
			body('date').optional().bail().isDate().withMessage('should be a valid date.').bail().toDate(),
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
