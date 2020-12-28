import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { TOSF } from '../models/TOSF';
import 'express-async-errors';
import { exportAsFile, groupBy } from '../helpers';
import { Fee } from '../models/Fee';
import dayjs from 'dayjs';
import fs from 'fs';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json(await TOSF.find({ relations: ['fees'] }));
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const tosf = await TOSF.findOne(id, { relations: ['fees'] });
	if (!tosf) {
		throw new NotFoundException('TOSF does not exist.');
	}

	return res.json(tosf);
});

router.get('/:id/export', async (req, res) => {
	const id = req.params.id;
	const tosf = await TOSF.findOne(id, { relations: ['fees'] });
	if (!tosf) {
		throw new NotFoundException('TOSF does not exist.');
	}

	tosf.fees = await Promise.all(tosf.fees.map(async (fee) => await Fee.findOneOrFail(fee.id, { relations: ['degrees'] })));
	console.log(req.app.get('templatesPath'));
	const file = await exportAsFile(
		req.app.get('templatesPath'),
		'template-tosf.docx',
		{
			school: tosf.school,
			address: tosf.address,
			updatedAt: dayjs(tosf.updatedAt).format('MMMM DD, YYYY'),
			preparedBy: tosf.preparedBy,
			approvedBy: tosf.approvedBy,
			certifiedBy: tosf.certifiedBy,
			fees: groupBy(tosf.fees, 'type').map((fees) => ({
				type: fees[0].type,
				rows: fees.map(
					({ name, year, amount, degrees, coverage, frequencyPerAY, referenceNumber, dateOfApproval, description }) => ({
						name,
						year,
						amount,
						coverage,
						frequencyPerAY,
						referenceNumber,
						dateOfApproval: dayjs(dateOfApproval).format('MMMM DD, YYYY'),
						description,
						degrees: degrees.map((degree) => ({ name: `\n${degree.name}` })),
					})
				),
			})),
		},
		'TOSF'
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
		body('address').notEmpty().withMessage('is required.').bail().isString(),
		body('preparedBy').notEmpty().withMessage('is required.').bail().isString(),
		body('certifiedBy').notEmpty().withMessage('is required.').bail().isString(),
		body('approvedBy').notEmpty().withMessage('is required.').bail().isString(),
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
			const tosf = await TOSF.findOne(id, {
				relations: ['fees'],
			});

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
