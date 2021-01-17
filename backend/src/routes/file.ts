import { Router } from 'express';
import { File } from '../models/File';
import 'express-async-errors';
import { NotFoundException } from '../exceptions/NotFoundException';
import fs from 'fs';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json(await File.find());
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;

	const file = await File.findOne(id);

	if (!file) {
		throw new NotFoundException('File does not exist.');
	}

	const binary = fs.readFileSync(file.path);
	res.setHeader('Content-Type', file.mimeType);
	res.setHeader('Content-Length', file.size);
	res.setHeader('X-File-Name', file.name);
	return res.send(binary);
});

router.get('/:id/download', async (req, res) => {
	const id = req.params.id;

	const file = await File.findOne(id);

	if (!file) {
		throw new NotFoundException('File does not exist.');
	}

	const binary = fs.readFileSync(file.path);
	res.setHeader('Content-Type', file.mimeType);
	res.setHeader('Content-Length', file.size);
	res.setHeader('X-File-Name', file.name);
	return res.send(binary);
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	const file = await File.findOne(id);

	if (!file) {
		throw new NotFoundException('File does not exist.');
	}

	await file.remove();

	return res.sendStatus(204);
});

export const file = router;
