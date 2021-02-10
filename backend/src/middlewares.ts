import { NextFunction, Request, Response, Router } from 'express';
import md5 from 'md5';
import multer from 'multer';
import passport from 'passport';
import mimeTypes from 'mime-types';
import path from 'path';
import { Strategy } from 'passport-http-bearer';
import { Token } from './models/Token';

export function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
	console.error(error);
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
						let token = await Token.findOne({
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

const storage = multer.diskStorage({
	destination: (_req, _file, callback) => {
		callback(null, path.join(__dirname, '../storage'));
	},
	filename: (_req, { fieldname, mimetype, filename }, callback) => {
		const extension = mimeTypes.extension(mimetype);
		if (!extension) {
			return callback(new Error('Invalid extension.'), filename);
		}
		callback(null, `${fieldname}-${Date.now()}.${extension}`);
	},
});

export const upload = multer({ storage });
