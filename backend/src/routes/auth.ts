import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import md5 from 'md5';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { Hash, String, Validation } from '../helpers';
import { Token } from '../models/Token';
import { User } from '../models/User';
import { auth as a } from '../middlewares';
import 'express-async-errors';

const router = Router();

router.get('/check', ...a((req: Request, res: Response) => res.json(req.user)));

router.post(
	'/register',
	[
		body('email')
			.isEmail()
			.withMessage('must be a valid email.')
			.bail()
			.custom(Validation.unique(User, 'email')),
		body('password')
			.notEmpty()
			.withMessage('is required.')
			.bail()
			.isString(),
		// .bail()
		// .isStrongPassword()
		// .withMessage('is not strong.'),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationException(errors.array());
		}

		const { email, password } = matchedData(req, {
			locations: ['body'],
		});

		const user = await new User({
			email,
			password: Hash.make(password),
		}).save();

		const token = String.random(40);
		await new Token({ hash: md5(token), user }).save();

		return res.json({ user, token });
	}
);

router.post(
	'/login',
	[body('email').isEmail(), body('password').notEmpty().bail().isString()],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationException(errors.array());
		}

		const { email, password } = matchedData(req, {
			locations: ['body'],
		});

		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			throw new NotFoundException('Email does not exist.');
		}

		if (!Hash.check(password, user.password)) {
			throw new ForbiddenException('Password is incorrect.');
		}

		const token = String.random(40);
		await new Token({ hash: md5(token), user }).save();

		return res.json({ user, token });
	}
);

router.delete(
	'/logout',
	...a(async (req: Request, res: Response) => {
		const hash = req.headers.authorization!.split(' ')[1];
		const token = await Token.findOne({
			where: {
				hash: md5(hash),
			},
		});
		await token!.remove();
		return res.sendStatus(204);
	})
);

export const auth = router;
