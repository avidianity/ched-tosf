import { NextFunction, Request, Response, Router } from 'express';
import md5 from 'md5';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import { HttpException } from './exceptions/HttpException';
import { ValidationException } from './exceptions/ValidationException';
import { Token } from './models/Token';

export function errorHandler(
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	console.error(error);
	if (
		error instanceof HttpException ||
		error instanceof ValidationException
	) {
		return res.status(error.status).json(error);
	}
	return res.status(error.status || 500).json(error);
}

/**
 * Creates a passport authentication middleware.
 * @param callback A callback to be done after request is authenticated.
 */
export function auth(callback?: Function | Function[] | Router | Router[]) {
	const middlewares = [
		(_req: Request, _res: Response, next: NextFunction) => {
			passport.use(
				new Strategy(async (hash, done) => {
					try {
						const token = await Token.findOne({
							where: {
								hash: md5(hash),
							},
							relations: ['user'],
						});
						if (!token) {
							return done(null, false);
						}
						token.lastUsed = new Date();
						token.save().catch(console.error);
						return done(null, token.user);
					} catch (error) {
						console.error(error);
						return done(error);
					}
				})
			);
			return next();
		},
		passport.authenticate('bearer', { session: false }),
	];
	if (callback) {
		middlewares.push(callback);
	}
	return middlewares;
}
