import { Request, Response, Router } from 'express';
import 'express-async-errors';
import { body, matchedData, validationResult } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { Validation } from '../helpers';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_, res) => res.json(await User.find()));

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const user = await User.findOne(id);

	if (!user) {
		throw new NotFoundException('User does not exist.');
	}

	return res.json(user);
});

router.post(
	'/',
	[
		body('email').notEmpty().withMessage('is required.').bail().isEmail().bail().isString(),
		body('password').notEmpty().withMessage('is required.').bail().isString(),
		body('role').notEmpty().withMessage('is required.').bail().isString(),
	],
	Validation.validate(),
	async (req: Request, res: Response) => {
		return res.json(await new User(req.body).save());
	}
);

function update() {
	return [
		[
			body('email').optional().notEmpty().withMessage('is required.').bail().isEmail().bail().isString(),
			body('password').optional().notEmpty().withMessage('is required.').bail().isString(),
			body('role').optional().notEmpty().withMessage('is required.').bail().isString(),
		],
		async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new ValidationException(errors.array());
			}

			const id = req.params.id;

			const user = await User.findOne(id);

			if (!user) {
				throw new NotFoundException('User does not exist.');
			}

			const data = matchedData(req, { locations: ['body'] });

			return res.json(await user.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const user = await User.findOne(id);

	if (!user) {
		throw new NotFoundException('User does not exist.');
	}

	await user.remove();
	return res.sendStatus(204);
});

export const user = router;
