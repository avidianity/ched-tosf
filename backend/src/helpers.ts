import { hashSync, compareSync } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { ValidationException } from './exceptions/ValidationException';
import { Model } from './models/Model';
import Pizzip from 'pizzip';
import DocxTemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';
import { File } from './models/File';
import dayjs from 'dayjs';

export namespace String {
	export function random(length = 20) {
		const characters = '1234567890qwertyuiopasdfghjklmznxbcvQWPEORITUYLAKSJDHFGMZNXBCV';
		let result = '';
		for (let x = 0; x < length; x++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	export function ucfirst(string: string) {
		const array = string.split('');
		array[0] = array[0].toUpperCase();
		return array.join('');
	}

	export function ucwords(string: string) {
		return string
			.split(' ')
			.map((word) => ucfirst(word))
			.join(' ');
	}
}

export namespace Validation {
	export function unique<T extends Model, K extends keyof T>(model: { new (): T }, key: K, message?: string) {
		const Model: any = model;
		return async (value: any) => {
			try {
				const exists = await Model.findOne({
					where: {
						[key]: value,
					},
				});
				if (exists) {
					return Promise.reject(
						message ? message : `${String.ucfirst(key as string)} is already taken. Did you mean to sign in?`
					);
				}
				return true;
			} catch (error) {
				console.error(error);
				return Promise.reject(`Unable to verify ${key}.`);
			}
		};
	}

	export function exists<T extends Model, K extends keyof T>(model: { new (): T }, key: K, message?: string) {
		const Model: any = model;
		return async (value: any) => {
			try {
				const exists = await Model.findOne({
					where: {
						[key]: value,
					},
				});
				if (!exists) {
					return Promise.reject(message ? message : `${String.ucfirst(key as string)} does not exist.`);
				}
				return true;
			} catch (error) {
				console.error(error);
				return Promise.reject(`Unable to verify ${key}.`);
			}
		};
	}

	export function validate() {
		return (req: Request, _res: Response, next: NextFunction) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(new ValidationException(errors.array()));
			}

			const data = matchedData(req, { locations: ['body'] });
			req.body = { ...data };
			return next();
		};
	}
}

export namespace Hash {
	export function make(data: any) {
		return hashSync(data, 8);
	}

	export function check(data: any, hashed: string) {
		return compareSync(data, hashed);
	}
}

export async function exportAsFile(folderPath: string, fileName: string, data: any, type: string) {
	function errorHandler(error: any) {
		console.log(
			JSON.stringify({ error: error }, (key: any, value: any) => {
				if (value instanceof Error) {
					return Object.getOwnPropertyNames(value).reduce((error: any, key: any) => {
						error[key] = (<any>value)[key];
						return error;
					}, {});
				}
				return value;
			})
		);

		if (error.properties && error.properties.errors instanceof Array) {
			const errorMessages = error.properties.errors
				.map((error: any) => {
					return error.properties.explanation;
				})
				.join('\n');
			console.log('Error Messages:', errorMessages);
		}
		throw error;
	}
	try {
		const content = fs.readFileSync(path.resolve(folderPath, fileName), 'binary');
		const zip = new Pizzip(content);
		const doc = new DocxTemplater(zip, { linebreaks: true });
		doc.setData(data);
		doc.render();
		const buffer = doc.getZip().generate({ type: 'nodebuffer' });
		const saveName = `${type}-${dayjs(new Date()).format('MMMM-DD-YYYY')}-${String.random(10)}.docx`;
		const realPath = path.resolve(folderPath, `${saveName}`);
		fs.writeFileSync(realPath, buffer);
		const file = new File();
		file.mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
		file.size = Buffer.byteLength(buffer);
		file.type = type;
		file.name = saveName;
		file.path = realPath;
		return await file.save();
	} catch (error) {
		errorHandler(error);
		return false;
	}
}

export function groupBy<T, K extends keyof T>(data: Array<T>, key: K) {
	const temp: { [key: string]: Array<T> } = {};

	data.forEach((item) => {
		const property: any = item[key];
		if (!(property in temp)) {
			temp[property] = [];
		}
		temp[property].push(item);
	});
	return Object.keys(temp).map((key) => temp[key]);
}
