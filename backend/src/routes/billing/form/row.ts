import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { NotFoundException } from '../../../exceptions/NotFoundException';
import { Validation } from '../../../helpers';
import { BillingForm } from '../../../models/BillingForm';
import { BillingFormRow } from '../../../models/BillingFormRow';
import 'express-async-errors';

const router = Router();

router.get('/:id', async (req, res) => {
	const id = req.params.id;

	const form = await BillingFormRow.findOne(id);

	if (!form) {
		throw new NotFoundException('Billing Form Row does not exist.');
	}

	return res.json(form);
});

router.post(
	'/',
	[
		body('sequenceNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('studentNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('lastName').notEmpty().withMessage('is required.').bail().isString(),
		body('givenName').notEmpty().withMessage('is required.').bail().isString(),
		body('middleInitial').notEmpty().withMessage('is required.').bail().isString(),
		body('degreeProgram').notEmpty().withMessage('is required.').bail().isString(),
		body('year').notEmpty().withMessage('is required.').bail().isString(),
		body('sex').notEmpty().withMessage('is required.').bail().isString(),
		body('unitsEnrolled').notEmpty().withMessage('is required.').bail().isString(),
		body('nstpUnitsEnrolled').notEmpty().withMessage('is required.').bail().isString(),
		body('tuitionFee').notEmpty().withMessage('is required.').bail().isString(),
		body('nstpFee').notEmpty().withMessage('is required.').bail().isString(),
		body('athleticFees').notEmpty().withMessage('is required.').bail().isString(),
		body('computeFees').notEmpty().withMessage('is required.').bail().isString(),
		body('culturalFees').notEmpty().withMessage('is required.').bail().isString(),
		body('developmentFees').notEmpty().withMessage('is required.').bail().isString(),
		body('admissionFees').notEmpty().withMessage('is required.').bail().isString(),
		body('guidanceFees').notEmpty().withMessage('is required.').bail().isString(),
		body('handbookFees').notEmpty().withMessage('is required.').bail().isString(),
		body('laboratoryFees').notEmpty().withMessage('is required.').bail().isString(),
		body('libraryFee').notEmpty().withMessage('is required.').bail().isString(),
		body('medicalFees').notEmpty().withMessage('is required.').bail().isString(),
		body('registrationFees').notEmpty().withMessage('is required.').bail().isString(),
		body('schoolIDFees').notEmpty().withMessage('is required.').bail().isString(),
		body('totalTOSF').notEmpty().withMessage('is required.').bail().isString(),
		body('formId').notEmpty().withMessage('is required.').bail().custom(Validation.exists(BillingForm, 'id')),
	],
	Validation.validate(),
	async (req: Request, res: Response) => {
		const data = req.body;

		data.form = await BillingForm.findOneOrFail(data.formId);

		return res.json(await new BillingFormRow(data).save());
	}
);

function update() {
	return [
		[
			body('sequenceNumber').optional().bail().isString(),
			body('studentNumber').optional().bail().isString(),
			body('lastName').optional().bail().isString(),
			body('givenName').optional().bail().isString(),
			body('middleInitial').optional().bail().isString(),
			body('degreeProgram').optional().bail().isString(),
			body('year').optional().bail().isString(),
			body('sex').optional().bail().isString(),
			body('unitsEnrolled').optional().bail().isString(),
			body('nstpUnitsEnrolled').optional().bail().isString(),
			body('tuitionFee').optional().bail().isString(),
			body('nstpFee').optional().bail().isString(),
			body('athleticFees').optional().bail().isString(),
			body('computeFees').optional().bail().isString(),
			body('culturalFees').optional().bail().isString(),
			body('developmentFees').optional().bail().isString(),
			body('admissionFees').optional().bail().isString(),
			body('guidanceFees').optional().bail().isString(),
			body('handbookFees').optional().bail().isString(),
			body('laboratoryFees').optional().bail().isString(),
			body('libraryFee').optional().bail().isString(),
			body('medicalFees').optional().bail().isString(),
			body('registrationFees').optional().bail().isString(),
			body('schoolIDFees').optional().bail().isString(),
			body('totalTOSF').optional().bail().isString(),
		],
		Validation.validate(),
		async (req: Request, res: Response) => {
			const data = req.body;
			const id = req.params.id;

			const row = await BillingFormRow.findOne(id);
			if (!row) {
				throw new NotFoundException('Billing Form Row does not exist.');
			}
			return res.json(await row.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id/billing', async (req, res) => {
	const id = req.params.id;

	const form = await BillingForm.findOne(id, { relations: ['rows'] });

	if (!form) {
		throw new NotFoundException('Billing Form does not exist.');
	}

	await Promise.all(form.rows.map((row) => row.remove()));
	return res.sendStatus(204);
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	const row = await BillingFormRow.findOne(id);

	if (!row) {
		throw new NotFoundException('Billing Form Row does not exist.');
	}

	await row.remove();
	return res.sendStatus(204);
});

export const billingFormRow = router;
